import User from "../models/User.js";
// Error
import { BadRequestError } from "../errors/index.js";

const checkUserBalance = async (requestUserId, purchaseAmount) => {
  const { userBalance } = await User.findById(requestUserId);
  if (userBalance - purchaseAmount > 0) return;
  throw new BadRequestError("Insufficient Balance");
};

export default checkUserBalance;
