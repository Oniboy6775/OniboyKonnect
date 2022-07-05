import express from "express";
import {
  adminDetails,
  generateCoupon,
  updateAvailableServices,
  updatePrices,
} from "../controllers/adminController.js";
const router = express.Router();

router.route("/").get(adminDetails);
router.route("/updateServices").get(updateAvailableServices);
router.route("/updatePrices").post(updatePrices);

router.post("/generateCoupon", generateCoupon);
export default router;
