export const analyzeATS = async (req, res) => {
  try {
    const { resume } = req.body;

    const prompt = `
Return ONLY valid JSON (no text).

Analyze this resume:
${JSON.stringify(resume)}

Format:
{
  "score": 85,
  "summary": "string",
  "strengths": ["..."],
  "improvements": ["..."]
}
`;

    const result = await callOpenRouter(prompt);

    let parsed;

    try {
      parsed = JSON.parse(result);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: result
      });
    }

    return res.json({
      success: true,
      analysis: parsed
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "ATS analysis failed",
      error: err.message
    });
  }
};
