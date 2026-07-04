import express from "express";
import Subscription from "../models/Subscription.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Create payment request (UPI manual)
router.post("/upi-request", auth, async (req, res) => {
  try {
    const existing = await Subscription.findOne({ userId: req.user.id });

    if (existing) {
      return res.json({ message: "Already requested or active" });
    }

    const sub = await Subscription.create({
      userId: req.user.id,
      plan: "pro",
      paymentStatus: "pending",
    });

    res.json({
      success: true,
      message: "UPI payment request created",
      upiId: "resumeai@ybl",
      amount: 99,
      subscriptionId: sub._id,
    });
  } catch (err) {
    res.status(500).json({ error: "Payment request failed" });
  }
});

// Submit UTR after payment
router.post("/verify-utr", auth, async (req, res) => {
  try {
    const { utr } = req.body;

    const sub = await Subscription.findOneAndUpdate(
      { userId: req.user.id },
      { utr, paymentStatus: "pending" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Payment submitted for verification",
      sub,
    });
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
});

// Admin approve payment
router.post("/approve/:id", async (req, res) => {
  try {
    const sub = await Subscription.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "approved", plan: "pro" },
      { new: true }
    );

    res.json({ success: true, sub });
  } catch (err) {
    res.status(500).json({ error: "Approval failed" });
  }
});

export default router;
