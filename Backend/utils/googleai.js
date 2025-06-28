const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function generateContent(contents) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });
  return response.text;
}

module.exports = { generateContent };