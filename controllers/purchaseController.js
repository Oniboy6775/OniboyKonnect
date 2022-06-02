import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Receipt from "../TransactionReceipt/receipt.js";
import { BadRequestError } from "../errors/index.js";
import { BUY_AIRTIME } from "../apiCalls/index.js";
const buyAirtime = async (req, res) => {
  const { amount, phoneNumber, network } = req.body;
  const userId = req.user.userId;
  const { userBalance, userType, _id } = await User.findOne({
    _id: userId,
  });

  const isReseller = userType === "reseller";
  const isApiUser = userType === "api user";
  let amountToCharge = amount * 0.98;
  if (isReseller || isApiUser) amountToCharge = amount * 0.97;
  if (!amount || !phoneNumber || !network) {
    throw new BadRequestError("Provide all values");
  }
  if (userBalance < amountToCharge) {
    throw new BadRequestError("Insufficient fund");
  }
  let NETWORK = "";
  if (network == "1") NETWORK = "AIRTEL";
  if (network == "2") NETWORK = "MTN";
  if (network == "3") NETWORK = "GLO";
  if (network == "4") NETWORK = "9MOBILE";
  //   CHARGING THE USER
  await User.updateOne({ _id: userId }, { $inc: { balance: -amountToCharge } });
  //   DATA_RELOADED API CALL
  await BUY_AIRTIME(phoneNumber, amount, network);
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

export { buyAirtime };
