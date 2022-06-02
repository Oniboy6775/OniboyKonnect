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
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
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
  userPin: {
    type: String,
    required: [true, "set a transaction pin"],
  },
  userType: {
    type: String,
    default: "smart earner",
    enum: ["smart earner", "reseller", "api user"],
  },
  referredBy: { type: String, lowercase: true },
  apiKey: {
    type: String,
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre("save", async function () {
  if (!this.isModified("userPin")) return;
  const salt = await bcrypt.genSalt(10);
  this.userPin = await bcrypt.hash(this.userPin, salt);
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

UserSchema.methods.compareUserPin = async function (userPin) {
  const isMatch = await bcrypt.compare(userPin, this.userPin);
  return isMatch;
};

export default mongoose.model("User", UserSchema);