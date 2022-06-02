import express from "express";
import { coupon } from "../controllers/fundwalletController.js";
const router = express.Router();
router.post("/coupon", coupon);
export default router;
