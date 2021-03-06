// MODELS
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Data from "../models/Data.js";
import Transaction from "../models/Transaction.js";
import Coupon from "../models/Coupon.js";
// MODULES
import voucher_codes from "voucher-code-generator";
// OTHERS
import Receipt from "../TransactionReceipt/receipt.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const adminDetails = async (req, res) => {
  const servicesAvailable = await Admin.findOne();
  // Available admin balance
  // Registered users
  const myUsers = await User.find();
  // users transactions
  const userTransactions = await Transaction.find().sort("-createdAt");
  // All data prices
  const dataPrices = await Data.find();
  const adminInfo = {
    servicesAvailable,
    userTransactions,
    myUsers,
    dataPrices,
  };
  res.status(StatusCodes.OK).json({ adminInfo });
};
const updateAvailableServices = async (req, res) => {
  const body = {
    isCableTvAvailable: false,
    isAirtelCgAvailable: false,
  };

  await Admin.updateOne({}, { $set: { ...body } });
  const updatedAvailableService = await Admin.findOne();

  res.send(updatedAvailableService);
};
const updatePrices = async (req, res) => {
  const { dataId, newPrice } = req.body;

  const updatedDataPrice = await Data.updateOne(
    { _id: dataId },
    { ...newPrice }
  );
  if (updatedDataPrice.matchedCount == 0)
    throw new BadRequestError("Data does not exist");
  res.status(StatusCodes.OK).json({ msg: "Data price updated " });
};
const validateUser = async (req, res) => {
  const { userAccount } = req.body;

  let user = await User.findOne({ userName: userAccount });
  if (!user) user = await User.findOne({ email: userAccount });
  if (!user) throw new NotFoundError("User does not exist");
  const { userName, email } = user;
  res.status(StatusCodes.OK).json({ msg: `${userName}(${email})` });
};
const fundUserWallet = async (req, res) => {
  const { userAccount, amount } = req.body;

  if (!userAccount || !amount)
    throw new BadRequestError("Please enter all value");
  let user = await User.findOne({ userName: userAccount });
  if (!user) user = await User.findOne({ email: userAccount });
  if (!user) throw new NotFoundError("User does not exist");
  const { userName, userBalance, _id: userId } = user;
  await User.updateOne({ userName }, { $inc: { userBalance: amount } });
  const payload = {
    planNetwork: "Wallet",
    planAmount: amount,
    transType: "wallet",
    tranStatus: "success",
    phoneNumber: userName,
    amountToCharge: amount,
    userBalance,
    userId,
    increaseBalance: true,
  };
  await Receipt(payload);
  res
    .status(StatusCodes.OK)
    .json({ msg: `You have successfully send ${amount} to ${userName}` });
};
const generateCoupon = async (req, res) => {
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
const fetchTransactions = async (req, res) => {
  const { userName, number } = req.query;
  const queryObject = {};
  if (userName) {
    const { _id: userId } = await User.findOne({
      userName: { $regex: userName, $options: "i" },
    });

    queryObject.transBy = userId;
  }
  if (number) queryObject.transNumber = { $regex: number, $options: "i" };
  const transactions = await Transaction.find(queryObject).sort("-createdAt");
  res.status(StatusCodes.OK).json({ total: transactions.length, transactions });
};
const fetchUsers = async (req, res) => {
  const { balance, userName } = req.query;
  const queryObject = {};
  if (balance) queryObject.userBalance = { $lt: balance };
  if (userName) queryObject.userName = { $regex: userName, $options: "i" };
  const users = await User.find(queryObject).sort("-createdAt");
  res.status(StatusCodes.OK).json({ users });
};
export {
  generateCoupon,
  adminDetails,
  updateAvailableServices,
  updatePrices,
  validateUser,
  fundUserWallet,
  fetchTransactions,
  fetchUsers,
};
