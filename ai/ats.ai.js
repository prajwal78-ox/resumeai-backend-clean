import { askAI } from "../services/openrouter.service.js";

export const analyzeATSScore = async (resumeText) => {
  const prompt = `
You are an ATS system used by companies like Google, Amazon.

Analyze this resume and return ONLY JSON:

{
  "score": 0-100,
  "missingKeywords": [],
  "strengths": [],
  "improvements": [],
  "recommendation": ""
}

Resume:
${resumeText}
`;

  const result = await askAI(prompt);

  try {
    return JSON.parse(result);
  } catch {
    return {
      score: 60,
      missingKeywords: [],
      strengths: [],
      improvements: [],
      recommendation: result,
    };
  }
};
