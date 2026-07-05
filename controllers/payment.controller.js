import { success, error } from "../utils/apiResponse.js";

/**
 * SIMPLE UPI PAYMENT GENERATOR (NO FAKE REDIRECT LOGIC)
 */
export const buyPlan = async (req, res) => {
  try {
    const { plan, amount } = req.body;

    const upiId = "9989066730-3@ybl";

    const upiLink = `upi://pay?pa=${upiId}&pn=ResumeAI&am=${amount}&cu=INR&tn=${plan}`;

    return success(res, {
      upiLink,
      message: "Open in UPI app to complete payment",
    });
  } catch (err) {
    return error(res, "Payment failed");
  }
};
