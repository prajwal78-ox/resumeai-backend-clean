import User from "../models/User.js";

export const checkCredits = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.credits <= 0) {
    return res.status(403).json({
      message: "No AI credits left. Upgrade plan.",
    });
  }

  req.userData = user;
  next();
};
