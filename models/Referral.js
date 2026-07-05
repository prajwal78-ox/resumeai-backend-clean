import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  userId: String,
  referralCode: String,
  referredUsers: [{ type: String }],
  rewardClaimed: { type: Boolean, default: false },
});

export default mongoose.model("Referral", referralSchema);
