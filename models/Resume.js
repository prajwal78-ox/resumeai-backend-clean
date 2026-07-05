import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      default: "My Resume",
    },

    data: {
      type: Object, // stores full resume JSON
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
