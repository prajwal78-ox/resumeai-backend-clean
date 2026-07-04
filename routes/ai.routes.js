import express from "express";
import { improveSummary } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/summary", improveSummary);

export default router;
