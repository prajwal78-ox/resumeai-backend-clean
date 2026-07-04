import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;

export const askAI = async (prompt) => {
  try {
    if (!API_KEY) {
      throw new Error("OPENROUTER_API_KEY missing in .env");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant for resume building.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://resumeai.app",
          "X-Title": "ResumeAI",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OPENROUTER ERROR:", error.response?.data || error.message);
    throw new Error("AI request failed");
  }
};
