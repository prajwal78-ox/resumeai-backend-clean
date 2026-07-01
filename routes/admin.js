import express from "express";

const router = express.Router();

// TEMP STORAGE (replace with DB later)
let payments = [];
let proUsers = [];

/**
 * GET ALL PAYMENTS
 */
router.get("/payments", (req, res) => {
  res.json(payments);
});

/**
 * APPROVE PAYMENT → MAKE PRO USER
 */
router.post("/approve/:id", (req, res) => {
  const { id } = req.params;

  const payment = payments.find((p) => p.id == id);

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: "Payment not found",
    });
  }

  payment.status = "approved";

  proUsers.push({
    email: payment.email,
    name: payment.name,
    activatedAt: new Date(),
  });

  res.json({
    success: true,
    message: "User upgraded to PRO",
  });
});

/**
 * REJECT PAYMENT
 */
router.post("/reject/:id", (req, res) => {
  const { id } = req.params;

  const payment = payments.find((p) => p.id == id);

  if (payment) {
    payment.status = "rejected";
  }

  res.json({
    success: true,
    message: "Payment rejected",
  });
});

/**
 * GET PRO USERS
 */
router.get("/pro-users", (req, res) => {
  res.json(proUsers);
});

export default router;
