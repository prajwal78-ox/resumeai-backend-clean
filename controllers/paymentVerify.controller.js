import express from "express";
import { createUpiPayment } from "../controllers/upi.controller.js";
import { verifyPayment } from "../controllers/paymentVerify.controller.js";

const router = express.Router();

router.post("/create", createUpiPayment);
router.post("/verify", verifyPayment);

export default router;
