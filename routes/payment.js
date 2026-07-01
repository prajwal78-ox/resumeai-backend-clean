// FILE: server/routes/payment.js
import express from "express";

const router = express.Router();

let payments = [];

// USER SUBMIT UPI PAYMENT
router.post("/upi", (req, res) => {
  const { name, email, utr } = req.body;

  if (!utr) {
    return res.status(400).json({
      success: false,
      message: "UTR required",
    });
  }

  payments.push({
    id: Date.now(),
    name,
    email,
    utr,
    status: "pending",
  });

  res.json({
    success: true,
    message: "Payment submitted. Wait for approval.",
  });
});

// ADMIN VIEW
router.get("/all", (req, res) => {
  res.json(payments);
});

export default router;
