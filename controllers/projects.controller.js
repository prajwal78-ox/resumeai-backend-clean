import { askAI } from "../services/openrouter.service.js";

/* =========================
   AI PROJECT GENERATOR
========================= */
export const generateProject = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const aiPrompt = `
You are a professional resume writer.

Generate ONE high-quality software project for a resume.

IMPORTANT:
Return ONLY valid JSON. No markdown, no explanation.

Format:
{
  "title": "string",
  "description": "string (2-4 lines professional)",
  "technologies": ["tech1", "tech2", "tech3"],
  "achievements": ["achievement1", "achievement2", "achievement3"]
}

Project idea:
${prompt}
`;

    const result = await askAI(aiPrompt);

    // Clean AI response (sometimes models add extra text)
    let cleaned = result.trim();

    // Remove markdown code blocks if any
    cleaned = cleaned.replace(/```json/g, "").replace(/```/g, "");

    let project;

    try {
      project = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON Parse Error:", cleaned);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON format",
        raw: result,
      });
    }

    return res.json({
      success: true,
      project,
    });
  } catch (err) {
    console.error("Generate Project Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Project generation failed",
    });
  }
};

/* =========================
   AI PROJECT REWRITER
========================= */
export const rewriteProject = async (req, res) => {
  try {
    const { project } = req.body;

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project is required",
      });
    }

    const aiPrompt = `
Rewrite this resume project professionally.

Return ONLY valid JSON in this format:

{
  "title": "string",
  "description": "string",
  "technologies": ["tech1", "tech2"],
  "achievements": ["achievement1", "achievement2"]
}

Project:
${project}
`;

    const result = await askAI(aiPrompt);

    let cleaned = result.trim();
    cleaned = cleaned.replace(/```json/g, "").replace(/```/g, "");

    let rewritten;

    try {
      rewritten = JSON.parse(cleaned);
    } catch (err) {
      console.error("Rewrite JSON Error:", cleaned);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON format",
        raw: result,
      });
    }

    return res.json({
      success: true,
      project: rewritten,
    });
  } catch (err) {
    console.error("Rewrite Project Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Project rewrite failed",
    });
  }
};
