import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },

    credits: {
      type: Number,
      default: 3, // free trial credits
    },

    plan: {
      type: String,
      default: "free", // free | pro
    },

    totalSpent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wallet", walletSchema);
