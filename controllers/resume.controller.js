import Resume from "../models/Resume.js";
import { success, error } from "../utils/apiResponse.js";

/**
 * SAVE RESUME
 */
export const saveResume = async (req, res) => {
  try {
    const { title, data } = req.body;

    const resume = await Resume.create({
      userId: req.user.id,
      title,
      data,
    });

    return success(res, { resume });
  } catch (err) {
    return error(res, "Failed to save resume");
  }
};

/**
 * GET ALL RESUMES
 */
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });

    return success(res, { resumes });
  } catch (err) {
    return error(res, "Failed to fetch resumes");
  }
};

/**
 * DELETE RESUME
 */
export const deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);

    return success(res, { message: "Deleted" });
  } catch (err) {
    return error(res, "Delete failed");
  }
};
