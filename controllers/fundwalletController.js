// models
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
// errors
import { BadRequestError } from "../errors/index.js";

//modules
import { StatusCodes } from "http-status-codes";
import { sha512 } from "js-sha512";
import crypto from "crypto";

// others
import Receipt from "../TransactionReceipt/receipt.js";
const coupon = async (req, res) => {
  const { userId } = req.user;
  const { userName, coupon } = req.body;
  const user = await User.findById(userId);
  if (!userName || !coupon)
    throw new BadRequestError("Please provide all values");
  const availableCoupon = await Coupon.findOne({
    couponCode: coupon,
  });
  if (!availableCoupon) throw new BadRequestError("Invalid coupon");
  if (availableCoupon.couponOwner !== user.userName)
    throw new BadRequestError("Coupon belongs to another user");
  const { amount, couponCode, couponOwner } = availableCoupon;
  await Coupon.findOneAndDelete({
    couponCode: couponCode,
    couponOwner: userName,
  });
  await User.updateOne(
    { _id: req.user.userId },
    { $inc: { userBalance: amount } }
  );
  const receipt = await Receipt({
    planNetwork: "coupon",
    planAmount: amount,
    transType: "wallet",
    tranStatus: "success",
    phoneNumber: userName,
    amountToCharge: amount,
    userBalance: user.userBalance,
    userId: user._id,
    increaseBalance: true,
  });
  res.status(StatusCodes.OK).json({
    msg: `You have successfully fund your wallet with ${amount}`,
    amount: amount,
    receipt: receipt,
  });
};
const monnify = async (req, res) => {
  res.sendStatus(StatusCodes.OK);
  const stringifiedBody = JSON.stringify(req.body);
  // const computedHash = hmac(process.env.MONNIFY_API_SECRET, stringifiedBody);
  const computedHash = sha512.hmac(
    process.env.MONNIFY_API_SECRET,
    stringifiedBody
  );
  const monnifySignature = req.headers["monnify-signature"];

  if (!monnifySignature) console.log("No monnify signature");
  if (monnifySignature != computedHash) console.log("computed hash not equal");

  const {
    eventType,
    eventData: {
      settlementAmount,
      customer: { name, email },
    },
  } = req.body;
  if (eventType !== "SUCCESSFUL_TRANSACTION") return;
  let user = await User.findOne({ email });

  if (!user) return;
  const { _id, userBalance, userName } = user;
  await User.updateOne({ _id }, { $inc: { userBalance: settlementAmount } });
  await Receipt({
    planNetwork: "Auto-funding-SUCCESS||MNFY",
    planAmount: settlementAmount,
    transType: "wallet",
    tranStatus: "success",
    phoneNumber: userName,
    amountToCharge: settlementAmount,
    userBalance: user.userBalance,
    userId: user._id,
    increaseBalance: true,
  });
};
export { coupon, monnify };
