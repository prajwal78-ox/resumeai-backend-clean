import express from "express";

const router = express.Router();

// In-memory storage (later use DB)
const payments = [];

// Create payment request
router.post("/create", (req, res) => {
  const { name, email } = req.body;

  const paymentId = Date.now();

  const upiData = {
    paymentId,
    name,
    email,
    status: "PENDING",
    upiId: "yourupi@upi", // 👈 change this
    amount: 199,
  };

  payments.push(upiData);

  res.json(upiData);
});

// Submit UTR after payment
router.post("/verify", (req, res) => {
  const { paymentId, utr } = req.body;

  const payment = payments.find((p) => p.paymentId === paymentId);

  if (!payment) {
    return res.status(404).json({ error: "Payment not found" });
  }

  payment.utr = utr;
  payment.status = "UNDER_REVIEW";

  res.json({
    message: "Payment submitted for verification",
    payment,
  });
});

// Admin approve
router.post("/approve", (req, res) => {
  const { paymentId } = req.body;

  const payment = payments.find((p) => p.paymentId === paymentId);

  if (!payment) {
    return res.status(404).json({ error: "Payment not found" });
  }

  payment.status = "APPROVED";
  payment.userPlan = "PRO";

  res.json({
    message: "User upgraded to PRO",
    payment,
  });
});

// Get payment info
router.get("/:id", (req, res) => {
  const payment = payments.find(
    (p) => p.paymentId == req.params.id
  );

  res.json(payment || {});
});

export default router;
