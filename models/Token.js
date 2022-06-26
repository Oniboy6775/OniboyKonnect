import mongoose from "mongoose";

const tokenModel = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 900 },
});
export default mongoose.model("Token", tokenModel);
