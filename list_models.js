const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config({ path: ".env.local" });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`);
    const data = await response.json();
    fs.writeFileSync("models.json", JSON.stringify(data, null, 2));
    console.log("Models listed");
  } catch (err) {
    console.error(err);
  }
}

listModels();
