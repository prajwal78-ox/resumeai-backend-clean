import { askAI } from "../services/openrouter.service.js";

export const improveSummary = async (req, res) => {
  try {
    const { summary } = req.body;

    if (!summary || !summary.trim()) {
      return res.status(400).json({
        success: false,
        message: "Summary is required",
      });
    }

    const prompt = `
You are an expert resume writer.

Rewrite the following professional summary into a powerful, ATS-friendly resume summary.

Rules:
- Keep it 2–4 lines
- Make it impactful and professional
- Highlight skills and value
- Do NOT add extra commentary

Input:
${summary}
`;

    const result = await askAI(prompt);

    return res.json({
      success: true,
      summary: result,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI failed to generate summary",
    });
  }
};
