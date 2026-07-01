import express from "express";
import { generateResume } from "../../ai/resumeAI.js";

const router = express.Router();

// Resume AI route
router.post("/", generateResume);

export default router;
