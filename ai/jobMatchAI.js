// FILE: server/ai/jobMatchAI.js

export async function analyzeJobMatchAI(resume, jobDescription) {
  const prompt = `
You are an ATS AI system.

Return ONLY JSON:
{
  "score": number (0-100),
  "matchingSkills": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:
${resume}

Job Description:
${jobDescription}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTERAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    }
  );

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  return JSON.parse(content);
}
