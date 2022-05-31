import express from "express";
import { buyAirtime } from "../controllers/purchaseController.js";
const router = express.Router();

router.post("/airtime", buyAirtime);
export default router;
