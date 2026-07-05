import express from "express";
import {
  saveResume,
  getResumes,
  deleteResume,
} from "../controllers/resume.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveResume);
router.get("/", authMiddleware, getResumes);
router.delete("/:id", authMiddleware, deleteResume);

export default router;
