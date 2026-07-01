import express from "express";
import { analyzeJobMatch } from "../controllers/jobMatchController.js";

const router = express.Router();

router.post("/", analyzeJobMatch);

export default router;
