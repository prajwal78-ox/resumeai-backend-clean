import express from "express";
import Referral from "../models/Referral.js";

const router = express.Router();

/* Get referral info */
router.get("/:userId", async (req, res) => {
  const data = await Referral.findOne({ userId: req.params.userId });
  res.json({ success: true, data });
});

/* Apply referral */
router.post("/apply", async (req, res) => {
  const { referralCode, newUserId } = req.body;

  const ref = await Referral.findOne({ referralCode });

  if (!ref) {
    return res.json({ success: false, message: "Invalid code" });
  }

  ref.referredUsers.push(newUserId);
  await ref.save();

  res.json({ success: true });
});

export default router;
