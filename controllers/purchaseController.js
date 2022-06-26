// models
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
// modules
import { StatusCodes } from "http-status-codes";
// api calls
import { BUY_AIRTIME, BUY_DATA } from "../apiCalls/index.js";
// others
import { BadRequestError } from "../errors/index.js";
import Receipt from "../TransactionReceipt/receipt.js";
import checkUserBalance from "../utils/checkUserBalance.js";
import { dataPrices } from "../Mockdata/data.js";

const buyAirtime = async (req, res) => {
  const { amount, phoneNumber, networkId } = req.body;
  const userId = req.user.userId;
  const { userBalance, userType, _id } = await User.findOne({
    _id: userId,
  });

  const isReseller = userType === "reseller";
  const isApiUser = userType === "api user";
  let amountToCharge = amount * 0.98;
  if (isReseller || isApiUser) amountToCharge = amount * 0.97;
  if (!amount || !phoneNumber || !networkId) {
    throw new BadRequestError("Provide all values");
  }
  if (userBalance < amountToCharge) {
    throw new BadRequestError("Insufficient fund");
  }
  let NETWORK = "";
  if (networkId == "1") NETWORK = "MTN";
  if (networkId == "2") NETWORK = "GLO";
  if (networkId == "3") NETWORK = "AIRTEL";
  if (networkId == "4") NETWORK = "9MOBILE";
  //   CHARGING THE USER
  await User.updateOne(
    { _id: userId },
    { $inc: { userBalance: -amountToCharge } }
  );
  //   DATA_RELOADED API CALL
  await BUY_AIRTIME(phoneNumber, amount, networkId);
  //   RECEIPT
  const airtimeReceipt = await Receipt({
    planNetwork: NETWORK,
    planAmount: amount,
    transType: "airtime",
    tranStatus: "success",
    mobile_number: phoneNumber,
    amountToCharge,
    userBalance,
    userId: _id,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "Airtime purchase successful", receipt: airtimeReceipt });
};

const buyData = async (req, res) => {
  const {
    user: { userId, userType },
    body: { phoneNumber, planId, networkId },
  } = req;
  const isReseller = userType === "reseller";
  const isApiUser = userType === "api user";
  if (!phoneNumber || !planId || !networkId)
    throw new BadRequestError("Please provide all values");
  const dataToBuy = dataPrices.find((e) => e.planId == planId);
  if (!dataToBuy) throw new BadRequestError("The plan choose is not available");
  const { dataVolume, price, resellerPrice, networkName } = dataToBuy;
  let amountToCharge = price;
  if (isReseller || isApiUser) amountToCharge = resellerPrice;
  await checkUserBalance(userId, amountToCharge);
  const { userBalance, _id } = await User.findById(userId);
  // DATA RELOADED API
  await BUY_DATA(phoneNumber, planId, networkId);
  // CHARGE THE USER
  await User.updateOne(
    { _id: userId },
    { $inc: { userBalance: -amountToCharge } }
  );
  const dataReceipt = await Receipt({
    planNetwork: networkName,
    planAmount: dataVolume,
    transType: "data",
    tranStatus: "success",
    mobile_number: phoneNumber,
    amountToCharge,
    userBalance,
    userId: _id,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Data Purchase successful", receipt: dataReceipt });
};
export { buyAirtime, buyData };
