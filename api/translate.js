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

const MAX_ITEMS = 100;
const MAX_TEXT_LENGTH = 5000;
const MAX_TOTAL_LENGTH = 30000;

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

function protectOriginalNames(text) {
  const replacements = [];
  let protectedText = text;

  const protectedNames = [
    "PETS & DOGUE",
    "PETS &amp; DOGUE",
    "DOGUE Trust",
    "DOGUE Verified",
    "DOGUE",
    "Miso"
  ];

  protectedNames.forEach((name, index) => {
    if (!
