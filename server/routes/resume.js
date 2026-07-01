import express from "express";
import { generateResume } from "../../ai/resumeGenerator.js";

const router = express.Router();

router.post("/", generateResume);

export default router;
