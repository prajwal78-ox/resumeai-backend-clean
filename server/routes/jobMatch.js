import express from "express";
import { analyzeJobMatch } from "../../controllers/jobMatchController.js";

const router = express.Router();

// Job Match API
router.post("/", analyzeJobMatch);

export default router;
