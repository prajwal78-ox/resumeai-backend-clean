import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  res.json({
    success: true,
    message: "Job Match API working"
  });
});

export default router;
