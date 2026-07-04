import axios from "axios";

/* =========================
   CORE AI FUNCTION
========================= */
export const callOpenRouter = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.log("OPENROUTER ERROR:", err.response?.data || err.message);
    throw new Error("AI request failed");
  }
};

/* =========================
   ALIASES (IMPORTANT FIX)
   to avoid ALL import errors
========================= */

// used by some controllers
export const askAI = callOpenRouter;
export const generateAI = callOpenRouter;
export const aiRequest = callOpenRouter;
