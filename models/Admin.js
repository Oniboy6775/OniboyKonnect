import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  isMtnAirtimeAvailable: { type: Boolean, default: true },
  isGloAirtimeAvailable: { type: Boolean, default: true },
  isAirtelAirtimeAvailable: { type: Boolean, default: true },
  is9mobileAirtimeAvailable: { type: Boolean, default: true },
  isMtnCgAvailable: { type: Boolean, default: true },
  isMtnSmeAvailable: { type: Boolean, default: true },
  isGloCgAvailable: { type: Boolean, default: true },
  isGloSmeAvailable: { type: Boolean, default: true },
  isAirtelCgAvailable: { type: Boolean, default: true },
  isAirtelCgAvailable: { type: Boolean, default: true },
  is9mobileSmeAvailable: { type: Boolean, default: true },
  is9mobileSmeAvailable: { type: Boolean, default: true },
  isCableTvAvailable: { type: Boolean, default: true },
  isElectricityTokenAvailable: { type: Boolean, default: true },
});

export default mongoose.model("Admin", adminSchema);
