import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema({
  transId: { type: String, required: true, unique: true },
  transBy: { type: String, required: true },
  transType: { type: String, required: true },
  transNetwork: { type: String, required: true },
  transNumber: { type: String },
  transAmount: { type: Number, required: true },
  balanceBefore: { type: Number, required: true },
  balanceAfter: { type: Number, required: true },
  transDate: { type: String },
  transStatus: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000, // this is the expiry time in seconds(expires in month time)
  },
});
export default mongoose.model("Transaction", TransactionSchema);

// TransactionSchema.pre("save",function )
