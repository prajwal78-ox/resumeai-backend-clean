import express from "express";
import {
  improveSummary,
  analyzeATS
} from "../controllers/ai.controller.js";

const router = express.Router();

/* AI ROUTES */
router.post("/summary", improveSummary);
router.post("/ats/analyze", analyzeATS);

export default router;
