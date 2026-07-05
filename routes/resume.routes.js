import express from "express";

import {
  saveResume,
  getResumes,
  getResumeById,
  deleteResume,
} from "../controllers/resume.controller.js";

import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

/* =========================
   SAAS DASHBOARD ROUTES
========================= */

router.post("/save", auth, saveResume);

router.get("/", auth, getResumes);

router.get("/:id", auth, getResumeById);

router.delete("/:id", auth, deleteResume);

export default router;
