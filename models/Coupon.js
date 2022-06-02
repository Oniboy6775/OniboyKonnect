import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true },
  couponOwner: { type: String, required: true, lowercase: true, trim: true },
  amount: Number,
  isUsed: Boolean,
});
export default mongoose.model("Coupon", couponSchema);
