import { askAI } from "../services/openrouter.service.js";

export const analyzeATS = async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required",
      });
    }

    const text = `
Resume:
${JSON.stringify(resume)}
`;

    const prompt = `
You are an ATS (Applicant Tracking System) expert.

Analyze this resume and return a STRICT JSON response.

Rules:
- Score from 0 to 100
- Evaluate:
  1. Skills relevance
  2. Experience quality
  3. Formatting
  4. Keywords match
  5. Missing sections

Return ONLY JSON like this:

{
  "score": 85,
  "summary": "Short analysis of resume quality",
  "strengths": ["...","..."],
  "weaknesses": ["...","..."],
  "improvements": ["...","..."]
}

Resume:
${text}
`;

    const result = await askAI(prompt);

    return res.json({
      success: true,
      analysis: result,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "ATS analysis failed",
    });
  }
};
