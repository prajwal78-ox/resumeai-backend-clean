import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: String,
    plan: {
      type: String,
      default: "free", // free | pro
    },
    paymentStatus: {
      type: String,
      default: "pending", // pending | approved
    },
    utr: String,
    screenshot: String,
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
