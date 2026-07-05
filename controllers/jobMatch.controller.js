import { askAI } from "../services/openrouter.service.js";

export const jobMatch = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    const prompt = `
You are an AI recruiter.

Compare resume with job description and give:

1. Match Score (0-100)
2. Missing Skills
3. Strengths
4. Final Recommendation (Hire / Not Hire / Maybe)

Resume:
${resume}

Job Description:
${jobDescription}
`;

    const result = await askAI(prompt);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Job match failed",
    });
  }
};
