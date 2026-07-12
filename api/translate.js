"use strict";

/*
=========================================================
PETS & DOGUE — SERVER TRANSLATION API
Vercel Serverless Function

Endpoint:
POST /api/translate

Request:
{
  "texts": ["Text one", "Text two"],
  "targetLanguage": "ru",
  "sourceLanguage": "en"
}

Response:
{
  "translations": ["Перевод один", "Перевод два"],
  "targetLanguage": "ru"
}
=========================================================
*/

const SUPPORTED_LANGUAGES = new Set([
  "en",
  "ru",
  "uk",
  "cs",
  "pl",
  "es",
  "it",
  "de",
  "ar",
  "hi"
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

const OPENAI_API_URL =
  "https://api.openai.com/v1/responses";

/*
You may set OPENAI_MODEL in Vercel.

If it is not set, the function uses gpt-4o-mini.
*/

const DEFAULT_MODEL = "gpt-4o-mini";

/*
These names should remain in their original form.

You can add official business names, product names,
promo codes or other protected names later.
*/

const PROTECTED_NAMES = [
  "PETS & DOGUE",
  "PETS &amp; DOGUE",
  "DOGUE Trust",
  "DOGUE Verified",
  "DOGUE",
  "Miso"
];

/* =========================================================
RESPONSE HELPERS
========================================================= */

function sendJson(response, status, data) {
  response.status(status).json(data
