// models
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
// errors
import { BadRequestError } from "../errors/index.js";

//modules
import { StatusCodes } from "http-status-codes";

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
export { coupon };
