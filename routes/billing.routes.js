import express from "express";
import { buyPlan } from "../controllers/billing.controller.js";

const router = express.Router();

router.post("/buy", buyPlan);

export default router;
