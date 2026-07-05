import Subscription from "../models/Subscription.js";

export const requirePro = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const sub = await Subscription.findOne({ userId });

    if (!sub || sub.plan === "FREE") {
      return res.status(403).json({
        success: false,
        message: "Upgrade to PRO to access this feature",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Subscription check failed" });
  }
};
