import { v4 } from "uuid";
import Transaction from "../models/Transaction.js";
const receipt = async (payload) => {
  const {
    id,
    planNetwork,
    planAmount,
    transType,
    tranStatus,
    phoneNumber,
    amountToCharge,
    userBalance,
    userId,
  } = payload;
  const newTransaction = Transaction({
    transId: v4(),
    transBy: userId,
    transType: transType,
    transNetwork: `${planNetwork} ${planAmount}`,
    transNumber: phoneNumber,
    transAmount: amountToCharge,
    balanceBefore: userBalance,
    balanceAfter: userBalance - amountToCharge,
    transDate: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
    transStatus: tranStatus,
    // createdAt: Date.now(),
  });

  const receipt = await newTransaction.save();
  return receipt;
};
export default receipt;
