import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    credits: { type: Number, default: 5 },
    plan: { type: String, default: "free" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
