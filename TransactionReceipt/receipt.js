import { v4 } from "uuid";
import Transaction from "../models/Transaction.js";
const receipt = async (payload) => {
  const {
    planNetwork,
    planAmount,
    transType,
    tranStatus,
    phoneNumber,
    amountToCharge,
    userBalance,
    userId,
    increaseBalance,
  } = payload;
  const newTransaction = Transaction({
    transId: v4(),
    transBy: userId,
    transType: transType,
    transNetwork: `${planNetwork} ${planAmount}`,
    transNumber: phoneNumber,
    transAmount: amountToCharge,
    balanceBefore: userBalance,
    balanceAfter: increaseBalance
      ? userBalance + amountToCharge
      : userBalance - amountToCharge,
    transDate: Date.now(),
    transStatus: tranStatus,
    // createdAt: Date.now(),
  });

  const receipt = await newTransaction.save();
  return receipt;
};
export default receipt;
