import express from "express";

const router = express.Router();

/**
 * Simple UPI payment generator (NO gateway)
 */
router.post("/create", (req, res) => {
  try {
    const { amount, plan } = req.body;

    const upiId = "9989066730-3@ybl";
    const name = "ResumeAI SaaS";

    const upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${plan}`;

    res.json({
      success: true,
      upiLink,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "UPI generation failed",
    });
  }
});

export default router;
