export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({
      error: "OPENAI_API_KEY is not configured in Vercel"
    });
  }

  try {
    const body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body || {};

    const sourceLanguage = String(
      body.sourceLanguage || "en"
    ).trim();

    const targetLanguage = String(
      body.targetLanguage || ""
    ).trim();

    const texts = Array.isArray(body.texts)
      ? body.texts.map((text) => String(text))
      : [];

    if (!targetLanguage) {
      return response.status(400).json({
        error: "Target language is required"
      });
    }

    if (texts.length === 0) {
      return response.status(400).json({
        error: "No texts were provided"
      });
    }

    if (texts.length > 50) {
      return response.status(400).json({
        error: "Too many texts in one request"
      });
    }

    const languageNames = {
      en: "English",
      uk: "Ukrainian",
      ru: "Russian",
      fr: "French",
      de: "German",
      es: "Spanish",
      it: "Italian",
      pt: "Portuguese",
      nl: "Dutch",
      pl: "Polish",
      cs: "Czech",
      sk: "Slovak",
      hu: "Hungarian",
      ro: "Romanian",
      bg: "Bulgarian",
      el: "Greek",
      sv: "Swedish",
      da: "Danish",
      no: "Norwegian",
      fi: "Finnish",
      tr: "Turkish",
      ar: "Arabic",
      hi: "Hindi"
    };

    const sourceName =
      languageNames[sourceLanguage] || sourceLanguage;

    const targetName =
      languageNames[targetLanguage] || targetLanguage;

    const openAIResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          instructions:
            `Translate website interface text from ${sourceName} to ${targetName}. ` +
            "Return only valid JSON. Preserve PETS & DOGUE, DOGUE, Miso, URLs, email addresses, emoji, numbers and placeholders. " +
            "Keep the same order and return exactly one translation for every input string.",
          input: JSON.stringify({
            texts
          }),
          text: {
            format: {
              type: "json_schema",
              name: "website_translations",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  translations: {
                    type: "array",
                    items: {
                      type: "string"
                    }
                  }
                },
                required: ["translations"],
                additionalProperties: false
              }
            }
          }
        })
      }
    );

    const result = await openAIResponse.json();

    if (!openAIResponse.ok) {
      console.error(
        "OpenAI translation error:",
        JSON.stringify(result)
      );

      return response.status(openAIResponse.status).json({
        error:
          result?.error?.message ||
          "Translation service failed"
      });
    }

    let outputText = "";

    if (typeof result.output_text === "string") {
      outputText = result.output_text;
    }

    if (!outputText && Array.isArray(result.output)) {
      for (const outputItem of result.output) {
        if (!Array.isArray(outputItem.content)) {
          continue;
        }

        for (const contentItem of outputItem.content) {
          if (
            contentItem.type === "output_text" &&
            typeof contentItem.text === "string"
          ) {
            outputText += contentItem.text;
          }
        }
      }
    }

    if (!outputText) {
      return response.status(502).json({
        error: "Translation service returned no text"
      });
    }

    const parsed = JSON.parse(outputText);

    if (!Array.isArray(parsed.translations)) {
      return response.status(502).json({
        error: "Invalid translation response"
      });
    }

    if (parsed.translations.length !== texts.length) {
      return response.status(502).json({
        error: "Translation count does not match"
      });
    }

    response.setHeader(
      "Cache-Control",
      "s-maxage=86400, stale-while-revalidate=604800"
    );

    return response.status(200).json({
      translations: parsed.translations
    });
  } catch (error) {
    console.error("Translation endpoint error:", error);

    return response.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Unexpected translation error"
    });
  }
}
      
