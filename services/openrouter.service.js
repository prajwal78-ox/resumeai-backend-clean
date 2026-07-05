import fetch from "node-fetch";

const API_KEY = process.env.OPENROUTER_API_KEY;
const URL = "https://openrouter.ai/api/v1/chat/completions";

export const askAI = async (prompt) => {
  try {
    if (!API_KEY) {
      throw new Error("Missing OPENROUTER_API_KEY");
    }

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices?.[0]) {
      return "AI temporarily unavailable. Try again.";
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error("AI ERROR:", err.message);

    return "AI service error. Please retry.";
  }
};
