	import Payment from "../models/Payment.js";
import User from "../models/User.js";

/* =========================
   CREATE UPI PAYMENT REQUEST
========================= */
export const createUPIPayment = async (req, res) => {
  try {
    const { plan, amount, transactionId } = req.body;

    const payment = await Payment.create({
      userId: req.user.id,
      plan,
      amount,
      transactionId,
      upiId: "resumeai@upi", // your UPI ID
      status: "PENDING",
    });

    res.json({
      success: true,
      message: "Payment request created",
      payment,
      upiLink: `upi://pay?pa=resumeai@upi&pn=ResumeAI&am=${amount}&cu=INR`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Payment creation failed",
    });
  }
};

/* =========================
   GET MY PAYMENTS (USER DASHBOARD)
========================= */
export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id });

    res.json({
      success: true,
      payments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
    });
  }
};

/* =========================
   ADMIN VERIFY PAYMENT
========================= */
export const verifyPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    payment.status = "VERIFIED";
    await payment.save();

    // upgrade user plan
    await User.findByIdAndUpdate(payment.userId, {
      plan: payment.plan,
    });

    res.json({
      success: true,
      message: "Payment verified & user upgraded",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};
