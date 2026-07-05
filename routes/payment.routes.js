import express from "express";

import {
  createUPIPayment,
  getMyPayments,
  verifyPayment,
} from "../controllers/payment.controller.js";

import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

/* USER */
router.post("/upi", auth, createUPIPayment);
router.get("/my", auth, getMyPayments);

/* ADMIN */
router.post("/verify/:id", verifyPayment);

export default router;
