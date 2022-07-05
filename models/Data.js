import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  planId: { type: String },
  networkId: { type: String },
  networkName: { type: String },
  dataVolume: { type: String },
  price: { type: String },
  resellerPrice: { type: String },
  validity: { type: String },
});
export default mongoose.model("Data", dataSchema);
