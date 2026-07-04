import { askAI } from "../services/openrouter.service.js";

export const improveSummary = async (req, res) => {
  try {
    const { summary } = req.body;

    if (!summary) {
      return res.status(400).json({
        error: "Summary is required",
      });
    }

    const prompt = `
Improve this resume summary to be ATS-friendly, professional, and impactful:

${summary}
`;

    const result = await askAI(prompt);

    return res.json({
      summary: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "AI processing failed",
    });
  }
};
