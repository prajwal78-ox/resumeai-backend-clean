import { askAI } from "../services/openrouter.service.js";

/* =========================
   SUMMARY AI
========================= */
export const improveSummary = async (req, res) => {
  try {
    const { summary } = req.body;

    const prompt = `
Improve this resume summary professionally:

${summary}

Make it:
- ATS friendly
- concise
- professional
`;

    const result = await askAI(prompt);

    res.json({
      success: true,
      summary: result,
    });

  } catch (err) {
    res.json({
      success: false,
      summary: "Unable to improve summary",
    });
  }
};
