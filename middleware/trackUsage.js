import Usage from "../models/Usage.js";

export const trackUsage = async (req, res, next) => {
  try {
    const userId = req.body.userId || "guest";

    await Usage.findOneAndUpdate(
      { userId },
      {
        $inc: { aiCalls: 1 },
        lastUsed: new Date(),
      },
      { upsert: true }
    );

    next();
  } catch (err) {
    next();
  }
};
