import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: String,
    plan: String,
    amount: Number,
    credits: Number,
    status: {
      type: String,
      default: "success",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
