import { askAI } from "../services/openrouter.service.js";

export const rewriteExperience = async (req, res) => {
  try {
    const { experience } = req.body;

    const prompt = `
Rewrite this work experience in ATS-friendly professional format:

${experience}

Make it strong, action-based, and achievement focused.
`;

    const result = await askAI(prompt);

    res.json({
      success: true,
      experience: result,
    });

  } catch (err) {
    res.json({
      success: false,
      experience: "Unable to rewrite experience",
    });
  }
};
