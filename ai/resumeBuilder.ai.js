import { askAI } from "../services/openrouter.service.js";

/**
 * Structured Resume Builder AI
 * Returns JSON-like resume sections
 */
export const buildResume = async (userData) => {
  const prompt = `
You are an expert ATS resume writer.

Generate a professional resume in JSON format only.

USER DATA:
Name: ${userData.name || "Not provided"}
Role: ${userData.role || "Fresher"}
Experience: ${userData.experience || "Not provided"}
Skills: ${userData.skills || "Not provided"}
Projects: ${userData.projects || "Not provided"}

OUTPUT FORMAT (STRICT JSON):
{
  "summary": "...",
  "experience": ["...", "..."],
  "skills": ["...", "..."],
  "projects": ["...", "..."],
  "atsTips": ["...", "..."]
}

Rules:
- No markdown
- No explanation
- Only valid JSON
`;

  const result = await askAI(prompt);

  try {
    return JSON.parse(result);
  } catch (err) {
    return {
      summary: result,
      experience: [],
      skills: [],
      projects: [],
      atsTips: [],
    };
  }
};
