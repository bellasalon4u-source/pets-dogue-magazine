"use strict";

const SUPPORTED_LANGUAGES = new Set([
  "en","ru","uk","cs","pl","es","it","de","ar","hi"
]);

const LANGUAGE_NAMES = {
  en:"English",
  ru:"Russian",
  uk:"Ukrainian",
  cs:"Czech",
  pl:"Polish",
  es:"Spanish",
  it:"Italian",
  de:"German",
  ar:"Arabic",
  hi:"Hindi"
};

const MAX_ITEMS = 100;
const MAX_TEXT_LENGTH = 5000;
const MAX_TOTAL_LENGTH = 30000;
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

function sendJson(response, status, data) {
  response.status(status).json(data);
}

function validateTexts(texts) {
  if (!Array.isArray(texts)) return "The texts field must be an array.";
  if (texts.length === 0) return "No text was provided.";
  if (texts.length > MAX_ITEMS) return `A maximum of ${MAX_ITEMS} text items is allowed.`;

  let total = 0;

  for (const text of texts) {
    if (typeof text !== "string") return "Every translation item must be text.";
    if (text.length > MAX_TEXT_LENGTH) return `One text item exceeds ${MAX_TEXT_LENGTH} characters.`;
    total += text.length;
  }

  if (total > MAX_TOTAL_LENGTH) {
    return `The request exceeds ${MAX_TOTAL_LENGTH} characters.`;
  }

  return "";
}

function extractOutputText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const parts = [];

  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "output_text" && typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }

  return parts.join("").trim();
}

function parseTranslations(rawText, expectedLength) {
  const cleaned = String(rawText || "")
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);
  const translations = Array.isArray(parsed) ? parsed : parsed?.translations;

  if (!Array.isArray(translations) || translations.length !== expectedLength) {
    throw new Error("The translation model returned an invalid response.");
  }

  return translations.map(item => String(item ?? ""));
}

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method === "GET") {
    return sendJson(response, 200, {
      ok:true,
      endpoint:"/api/translate",
      method:"POST"
    });
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    return sendJson(response, 405, { error:"Method not allowed." });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return sendJson(response, 500, {
      error:"OPENAI_API_KEY is not configured in Vercel."
    });
  }

  const body = request.body || {};
  const sourceLanguage = String(body.sourceLanguage || "en").toLowerCase();
  const targetLanguage = String(body.targetLanguage || "").toLowerCase();
  const texts = body.texts;

  if (!SUPPORTED_LANGUAGES.has(sourceLanguage)) {
    return sendJson(response, 400, { error:"Unsupported source language." });
  }

  if (!SUPPORTED_LANGUAGES.has(targetLanguage)) {
    return sendJson(response, 400, { error:"Unsupported target language." });
  }

  const validationError = validateTexts(texts);

  if (validationError) {
    return sendJson(response, 400, { error:validationError });
  }

  if (sourceLanguage === targetLanguage) {
    return sendJson(response, 200, {
      translations:texts,
      targetLanguage
    });
  }

  const instructions = [
    `Translate each item from ${LANGUAGE_NAMES[sourceLanguage]} to ${LANGUAGE_NAMES[targetLanguage]}.`,
    "Return only valid JSON in this exact format:",
    '{"translations":["item 1","item 2"]}',
    "Keep the same number and order of items.",
    "Preserve punctuation, numbers, prices, URLs, email addresses, phone numbers, HTML entities and emoji.",
    "Never translate these official names: PETS & DOGUE, DOGUE, DOGUE Trust, DOGUE Verified, Miso.",
    "Do not add markdown, comments or explanations."
  ].join("\n");

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method:"POST",
      headers:{
        "Authorization":`Bearer ${apiKey}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:MODEL,
        instructions,
        input:JSON.stringify({ texts })
      })
    });

    const data = await openAIResponse.json();

    if (!openAIResponse.ok) {
      return sendJson(response, openAIResponse.status, {
        error:data?.error?.message || "OpenAI translation request failed."
      });
    }

    const rawText = extractOutputText(data);
    const translations = parseTranslations(rawText, texts.length);

    return sendJson(response, 200, {
      translations,
      targetLanguage
    });
  } catch (error) {
    console.error("Translation endpoint error:", error);

    return sendJson(response, 500, {
      error:error?.message || "Translation failed."
    });
  }
};
