// MODELS
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Data from "../models/Data.js";
// MODULES
import voucher_codes from "voucher-code-generator";
// OTHERS
import Coupon from "../models/Coupon.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const adminDetails = async (req, res) => {
  const isAdmin = req.user.userId === process.env.ADMIN_ID;

  if (!isAdmin)
    throw new UnAuthenticatedError("Only Admin can access this routes");
  const servicesAvailability = await Admin.findOne();
  // Available admin balance
  // users transactions
  // Registered users
  // All data prices

  res.status(StatusCodes.OK).json(servicesAvailability);
};
const updateAvailableServices = async (req, res) => {
  const isAdmin = req.user.userId === process.env.ADMIN_ID;
  const body = {
    isCableTvAvailable: false,
    isAirtelCgAvailable: false,
  };
  if (!isAdmin)
    throw new UnAuthenticatedError("Only Admin can access this routes");

  await Admin.updateOne({}, { $set: { ...body } });
  const updatedAvailableService = await Admin.findOne();

  res.send(updatedAvailableService);
};
const updatePrices = async (req, res) => {
  const isAdmin = req.user.userId === process.env.ADMIN_ID;
  const { planId, newPrice } = req.body;

  if (!isAdmin)
    throw new UnAuthenticatedError("Only Admin can access this routes");
  const updatedDataPrice = await Data.updateOne({ planId }, { ...newPrice });
  if (updatedDataPrice.matchedCount == 0)
    throw new BadRequestError("Data does not exist");
  res.status(StatusCodes.OK).json({ msg: "Data price updated " });
};
const generateCoupon = async (req, res) => {
  if (req.user.userId !== process.env.ADMIN_ID)
    throw new BadRequestError("You are not authorized to perform this action");
  const { userAccount, amount } = req.body;
  const couponCode = voucher_codes.generate({
    length: 10,
  });
  if (!userAccount || !amount)
    throw new BadRequestError("All fields are required");

  let user = await User.find({ userName: userAccount });
  if (!user) user = await User.find({ email: userAccount });
  if (user.length < 1)
    throw new BadRequestError(`No user with this Username: ${userAccount}`);

  const newCoupon = new Coupon({
    couponCode: `${couponCode[0]}`,
    couponOwner: userAccount,
    amount: amount,
  });
  const savedCoupon = await newCoupon.save();
  return res.status(200).json(savedCoupon);
};

export { generateCoupon, adminDetails, updateAvailableServices, updatePrices };
