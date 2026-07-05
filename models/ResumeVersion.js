import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    resumeId: String,
    data: Object,
  },
  { timestamps: true }
);

export default mongoose.model("ResumeVersion", versionSchema);
