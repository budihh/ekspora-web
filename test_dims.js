const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

async function testEmbed() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
    const result = await model.embedContent({
      content: { parts: [{ text: "Hello world" }] },
      outputDimensionality: 768
    });
    console.log("gemini-embedding-2 with 768 length:", result.embedding.values.length);
  } catch (err) {
    console.error("gemini-embedding-2 failed", err.message);
  }
}

testEmbed();
