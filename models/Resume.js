import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    email: String,
    phone: String,
    summary: String,
    experience: String,
    education: String,
    skills: String,
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
