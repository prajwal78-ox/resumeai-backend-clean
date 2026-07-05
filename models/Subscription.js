import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: String,
    plan: {
      type: String,
      enum: ["FREE", "PRO", "PREMIUM"],
      default: "FREE",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "CANCELLED", "EXPIRED"],
      default: "ACTIVE",
    },
    expiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
