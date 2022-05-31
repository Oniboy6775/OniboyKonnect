import voucher_codes from "voucher-code-generator";

import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

const generateCoupon = async (req, res) => {
  //   res.send("coupon generated");
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
    isUsed: false,
  });
  const savedCoupon = await newCoupon.save();
  return res.status(200).json(savedCoupon);
};

export { generateCoupon };
