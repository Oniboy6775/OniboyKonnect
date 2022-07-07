import express from "express";
import {
  adminDetails,
  fetchTransactions,
  fetchUsers,
  fundUserWallet,
  generateCoupon,
  updateAvailableServices,
  updatePrices,
  validateUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.route("/").get(adminDetails);
router.route("/fetchTransactions").get(fetchTransactions);
router.route("/fetchUsers").get(fetchUsers);
router.route("/validateUser").post(validateUser);
router.route("/fundWallet").post(fundUserWallet);
router.route("/updatePrices").post(updatePrices);
router.route("/updateServices").get(updateAvailableServices);

router.post("/generateCoupon", generateCoupon);
export default router;
