import { askAI } from "../services/openrouter.service.js";

export const rewriteExperience = async (req, res) => {
  try {
    const { experience } = req.body;

    if (!experience?.trim()) {
      return res.status(400).json({
        error: "Experience is required",
      });
    }

    const prompt = `
You are an expert resume writer.

Rewrite the following work experience into powerful ATS-friendly resume bullet points.

Rules:
- Use action verbs.
- Highlight measurable achievements where appropriate.
- Keep it concise and professional.
- Return only the rewritten experience.

Experience:
${experience}
`;

    const result = await askAI(prompt);

    return res.json({
      success: true,
      experience: result,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: "AI failed to rewrite experience.",
    });
  }
};
