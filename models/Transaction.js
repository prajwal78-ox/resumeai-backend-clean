import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: String,
  type: String, // "credit_purchase"
  amount: Number,
  credits: Number,
});

export default mongoose.model("Transaction", schema);
