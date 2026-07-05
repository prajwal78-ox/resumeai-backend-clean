import User from "../models/User.js";

/* =========================
   SAVE RESUME
========================= */
export const saveResume = async (req, res) => {
  try {
    const { title, data } = req.body;

    const user = await User.findById(req.user.id);

    user.resumes.push({
      title,
      data,
    });

    await user.save();

    res.json({
      success: true,
      message: "Resume saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Save failed",
    });
  }
};

/* =========================
   GET ALL RESUMES (DASHBOARD)
========================= */
export const getResumes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      resumes: user.resumes || [],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
    });
  }
};

/* =========================
   GET SINGLE RESUME
========================= */
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user.id);

    const resume = user.resumes.id(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching resume",
    });
  }
};

/* =========================
   DELETE RESUME
========================= */
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user.id);

    user.resumes = user.resumes.filter(
      (r) => r._id.toString() !== id
    );

    await user.save();

    res.json({
      success: true,
      message: "Resume deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
