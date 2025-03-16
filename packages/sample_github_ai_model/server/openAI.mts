import OpenAI from "openai";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const API_KEY = process.env.GITHUB_PAT_FOR_AI_MODEL;
const API_ENDPOINT = "https://models.inference.ai.azure.com/";

if (!API_KEY) {
  console.warn(
    "Warning: GITHUB_PAT_FOR_AI_MODEL environment variable is not set",
  );
}

// Initialize OpenAI client
const client = new OpenAI({
  baseURL: API_ENDPOINT,
  apiKey: API_KEY,
});

/**
 * Creates a chat completion using the OpenAI API
 * @param userMessage - ユーザーからの質問テキスト（オプション）
 * @returns OpenAI API response
 */
export const createChatCompletions = async (userMessage?: string) => {
  try {
    const result = await client.chat.completions.create({
      messages: [
        { role: "system", content: "" },
        {
          role: "user",
          content: userMessage || "What is the capital of France?",
        },
      ],
      model: "gpt-4o-mini",
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
    });
    return result;
  } catch (error) {
    console.error("Error creating chat completion:", error);
    throw error;
  }
};
