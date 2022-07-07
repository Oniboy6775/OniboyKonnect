import express from "express";
import {
  adminDetails,
  fundUserWallet,
  generateCoupon,
  updateAvailableServices,
  updatePrices,
  validateUser,
} from "../controllers/adminController.js";
const router = express.Router();

router.route("/").get(adminDetails);
router.route("/validateUser").post(validateUser);
router.route("/fundWallet").post(fundUserWallet);
router.route("/updateServices").get(updateAvailableServices);
router.route("/updatePrices").post(updatePrices);

router.post("/generateCoupon", generateCoupon);
export default router;
