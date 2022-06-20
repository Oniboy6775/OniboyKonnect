import express from "express";
import { buyAirtime, buyData } from "../controllers/purchaseController.js";
const router = express.Router();

router.post("/airtime", buyAirtime);
router.post("/data", buyData);
export default router;
