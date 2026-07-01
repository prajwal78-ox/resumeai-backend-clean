import express from "express";
import { analyzeJobMatch } from "../controllers/jobMatchController.js";

const router = express.Router();

// Job Match AI route
router.post("/", analyzeJobMatch);

export default router;
