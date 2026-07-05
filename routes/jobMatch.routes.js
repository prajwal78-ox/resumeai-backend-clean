import express from "express";
import { jobMatch } from "../controllers/jobMatch.controller.js";

const router = express.Router();

router.post("/", jobMatch);

export default router;
