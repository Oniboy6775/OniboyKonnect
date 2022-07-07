import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide username"],
    minlength: 3,
    maxlength: 20,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  userBalance: {
    type: Number,
    default: 0,
  },

  userType: {
    type: String,
    default: "smart earner",
    enum: ["smart earner", "reseller", "api user"],
  },
  referredBy: { type: String, lowercase: true },
  reservedAccNo: { type: String },
  reservedAccNo2: { type: String },
  reservedAccBank: { type: String },
  reservedAccBank2: { type: String },
  apiKey: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // expires: 2592000, // this is the expiry time in seconds(expires in month time)
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
