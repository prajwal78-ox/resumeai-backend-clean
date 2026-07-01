import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OPENROUTERAI_API_KEY;

export async function generateResume(prompt) {
  const fullPrompt = `
You are a senior resume writer for top companies like Google, Amazon, Microsoft.

Generate a professional ATS-friendly resume.

Return ONLY valid JSON:

{
  "name": "",
  "title": "",
  "summary": "",
  "skills": [],
  "experience": [],
  "education": [],
  "projects": [],
  "atsScore": number
}

User input:
${prompt}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: fullPrompt }],
        temperature: 0.3,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Resume generation failed");
  }

  const data = await response.json();

  return JSON.parse(data.choices[0].message.content);
}
