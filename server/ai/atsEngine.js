import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENROUTERAI_API_KEY;

export async function generateATSScore(resume, jobDescription) {
  const prompt = `
You are a senior ATS (Applicant Tracking System) engine used by top companies.

Analyze resume vs job description.

Return ONLY valid JSON:

{
  "score": number (0-100),
  "matchingSkills": [],
  "missingSkills": [],
  "suggestions": [],
  "keywordsFound": [],
  "keywordsMissing": [],
  "hireProbability": "Low | Medium | High"
}

RULES:
- Be strict like real ATS systems (Google, Amazon level)
- Score based on keyword match + skill relevance
- Do NOT return text, ONLY JSON

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}
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
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("ATS Engine API failed");
  }

  const data = await response.json();

  return JSON.parse(data.choices[0].message.content);
}
