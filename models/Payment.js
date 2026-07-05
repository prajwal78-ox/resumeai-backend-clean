import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    plan: {
      type: String,
      enum: ["FREE", "PRO"],
      default: "FREE",
    },

    amount: {
      type: Number,
      default: 0,
    },

    upiId: String,

    transactionId: String,

    status: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
