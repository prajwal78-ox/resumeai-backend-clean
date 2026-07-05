import express from "express";
import { improveSummary } from "../controllers/ai.controller.js";
import { checkCredits } from "../middleware/credits.middleware.js";
import auth from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/summary", auth, checkCredits, improveSummary);

export default router;
