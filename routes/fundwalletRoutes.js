import express from "express";
import { coupon, monnify } from "../controllers/fundwalletController.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post("/coupon", auth, coupon);
router.post("/monnify", monnify);
export default router;
