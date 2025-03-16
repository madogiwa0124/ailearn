import express from "express";
import cors from "cors";
import { createChatCompletions } from "./openAI.mts";

// Create Express app
const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint for OpenAI chat completions
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "What is the capital of France?";
    const result = await createChatCompletions(userMessage);
    res.json(result);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "An error occurred while processing your request",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// 後方互換性のために GET メソッドも維持
app.get("/api/chat", async (req, res) => {
  try {
    const result = await createChatCompletions();
    res.json(result);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "An error occurred while processing your request",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
