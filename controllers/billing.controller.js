import User from "../models/User.js";
import Payment from "../models/Payment.js";

/* BUY CREDITS / UPGRADE PLAN */
export const buyPlan = async (req, res) => {
  try {
    const { userId, plan } = req.body;

    let credits = 0;
    let amount = 0;

    if (plan === "pro") {
      credits = 100;
      amount = 499;
    } else {
      credits = 20;
      amount = 99;
    }

    await User.findByIdAndUpdate(userId, {
      plan,
      $inc: { credits },
    });

    await Payment.create({
      userId,
      plan,
      amount,
      credits,
      status: "success",
    });

    res.json({
      success: true,
      message: "Plan activated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Payment failed",
      error: err.message,
    });
  }
};
