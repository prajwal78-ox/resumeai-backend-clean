import axios from "axios";

const client = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export async function askAI(prompt) {
  try {
    const res = await client.post("/chat/completions", {
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are ResumeAI, an expert ATS resume assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return res.data.choices[0].message.content;
  } catch (err) {
    console.log("AI ERROR:", err.response?.data || err.message);
    throw new Error("AI request failed");
  }
}
