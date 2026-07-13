"use strict";

const SUPPORTED_LANGUAGES = new Set([
  "en", "ru", "uk", "cs", "pl", "es", "it", "de", "ar", "hi"
]);

const LANGUAGE_NAMES = {
  en: "English",
  ru: "Russian",
  uk: "Ukrainian",
  cs: "Czech",
  pl: "Polish",
  es: "Spanish",
  it: "Italian",
  de: "German",
  ar: "Arabic",
  hi: "Hindi"
};

const MAX_ITEMS = 100;
const MAX_TEXT_LENGTH = 5000;
const MAX_TOTAL_LENGTH = 30000;
const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4.1-mini";

const PROTECTED_NAMES = [
  "PETS & DOGUE",
  "DOGUE Trust",
  "DOGUE Verified",
  "DOGUE",
  "Miso"
];

function sendJson(response, status, data) {
  response.status(status).json(data);
}

function validateTexts(texts) {
  if (!Array.isArray(texts)) {
    return "The texts field must be an array.";
  }

  if (texts.length === 0) {
    return "No text was provided.";
  }

  if (texts.length > MAX_ITEMS) {
    return `A maximum of ${MAX_ITEMS} text items is allowed.`;
  }

  let totalLength = 0;

  for (const text of texts) {
    if (typeof text !== "string") {
      return "Every translation item must be text.";
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return `One text item exceeds ${MAX_TEXT_LENGTH} characters.`;
    }

    totalLength += text.length;
  }

  if (totalLength > MAX_TOTAL_LENGTH) {
    return `The request exceeds ${MAX_TOTAL_LENGTH} characters.`;
  }

  return "";
}

function extractResponseText(data) {
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

function stripCodeFence(value) {
  return String(value || "")
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function parseTranslations(rawText, expectedLength) {
  const cleaned = stripCodeFence(rawText);
  let parsed;

  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    throw new Error("The translation model returned invalid JSON.");
  }

  const translations = Array.isArray(parsed)
    ? parsed
    : parsed?.translations;

  if (!Array.isArray(translations)) {
    throw new Error("The translation model returned no translations array.");
  }

  if (translations.length !== expectedLength) {
    throw new Error("The translation model returned an incorrect number of items.");
  }

  return translations.map(item => String(item ?? ""));
}

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method === "GET") {
    return sendJson(response, 200, {
      ok: true,
      endpoint: "/api/translate",
      method: "POST"
    });
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, GET");
    return sendJson(response, 405, {
      error: "Method not allowed."
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return sendJson(response, 500, {
      error: "OPENAI_API_KEY is not configured in Vercel."
    });
  }

  const body = request.body || {};
  const sourceLanguage = String(body.sourceLanguage || "en").toLowerCase();
  const targetLanguage = String(body.targetLanguage || "").toLowerCase();
  const texts = body.texts;

  if (!SUPPORTED_LANGUAGES.has(sourceLanguage)) {
    return sendJson(response, 400, {
      error: "Unsupported source language."
    });
  }

  if (!SUPPORTED_LANGUAGES.has(targetLanguage)) {
    return sendJson(response, 400, {
      error: "Unsupported target language."
    });
  }

  const validationError = validateTexts(texts);

  if (validationError) {
    return sendJson(response, 400, {
      error: validationError
    });
  }

  if (sourceLanguage === targetLanguage) {
    return sendJson(response, 200, {
      translations: texts,
      targetLanguage
    });
  }

  const protectedNamesText = PROTECTED_NAMES
    .map(name => `- ${name}`)
    .join("\n");

  const instructions = [
    `Translate every item from ${LANGUAGE_NAMES[sourceLanguage]} to ${LANGUAGE_NAMES[targetLanguage]}.`,
    "Return only valid JSON in this exact shape:",
    '{"translations":["translated item 1","translated item 2"]}',
    "Keep the same number and order of items.",
    "Do not add explanations, markdown, labels, or comments.",
    "Preserve punctuation, numbers, prices, URLs, email addresses, phone numbers, HTML entities, and emoji.",
    "Do not translate these official names:",
    protectedNamesText
  ].join("\n");

  try {
    const openAIResponse = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
        instructions,
        input: JSON.stringify({ texts }),
        temperature: 0
      })
    });

    const data = await openAIResponse.json();

    if (!openAIResponse.ok) {
      const upstreamMessage =
        data?.error?.message ||
        "OpenAI translation request failed.";

      console.error("OpenAI API error:", upstreamMessage);

      return sendJson(response, openAIResponse.status, {
        error: upstreamMessage
      });
    }

    const rawText = extractResponseText(data);
    const translations = parseTranslations(rawText, texts.length);

    return sendJson(response, 200, {
      translations,
      targetLanguage
    });
  } catch (error) {
    console.error("Translation endpoint error:", error);

    return sendJson(response, 500, {
      error: error?.message || "Translation failed."
    });
  }
};
