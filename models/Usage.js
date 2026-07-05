import mongoose from "mongoose";

const usageSchema = new mongoose.Schema(
  {
    userId: String,
    action: String, // "resume_created", "ai_used"
  },
  { timestamps: true }
);

export default mongoose.model("Usage", usageSchema);
