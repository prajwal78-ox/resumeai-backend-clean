import fetch from "node-fetch";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const askAI = async (prompt, retries = 2) => {
  const API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    if (!API_KEY || API_KEY.trim() === "") {
      throw new Error("Missing OPENROUTER_API_KEY");
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://resumeai.app",
        "X-Title": "ResumeAI"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter Error:", data);
      throw new Error(data?.error?.message || "AI request failed");
    }

    if (
      !data ||
      !data.choices ||
      !data.choices.length ||
      !data.choices[0].message
    ) {
      throw new Error("Invalid AI response");
    }

    return data.choices[0].message.content.trim();

  } catch (err) {
    console.error("AI ERROR:", err.message);

    if (retries > 0) {
      console.log(`Retrying AI request... (${retries})`);
      return askAI(prompt, retries - 1);
    }

    return "AI service temporarily unavailable. Please try again.";
  }
};
