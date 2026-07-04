import mongoose from "mongoose";

const usageSchema = new mongoose.Schema({
  userId: String,
  aiCalls: {
    type: Number,
    default: 0,
  },
  lastUsed: Date,
});

export default mongoose.model("Usage", usageSchema);
