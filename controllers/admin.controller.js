import Usage from "../models/Usage.js";
import Subscription from "../models/Subscription.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await Subscription.countDocuments();
    const proUsers = await Subscription.countDocuments({
      plan: "PRO",
    });

    const aiUsage = await Usage.countDocuments({
      action: "ai_used",
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        proUsers,
        aiUsage,
        estimatedRevenue: proUsers * 199,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Admin error" });
  }
};
