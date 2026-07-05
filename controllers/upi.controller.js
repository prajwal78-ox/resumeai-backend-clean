import Subscription from "../models/Subscription.js";

const UPI_ID = "9989066730-3@ybl";

export const createUpiPayment = async (req, res) => {
  try {
    const { plan, amount } = req.body;

    const upiLink = `upi://pay?pa=${UPI_ID}&pn=ResumeAI&am=${amount}&cu=INR`;

    res.json({
      success: true,
      upiId: UPI_ID,
      upiLink,
      instructions: "Pay and submit transaction ID to activate PRO",
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
