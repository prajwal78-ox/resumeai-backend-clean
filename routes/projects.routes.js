import express from "express";
import {
  generateProject,
  rewriteProject,
} from "../controllers/projects.controller.js";

const router = express.Router();

router.post("/generate", generateProject);
router.post("/rewrite", rewriteProject);

export default router;
