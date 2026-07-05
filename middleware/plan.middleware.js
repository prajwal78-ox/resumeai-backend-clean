export const checkPlan = (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // FREE LIMIT EXAMPLE
  if (user.plan === "FREE") {
    user.limit = {
      aiCalls: 5,
      resumes: 3,
    };
  }

  next();
};
