// models
import User from "../models/User.js";
import Token from "../models/Token.js";
import Transaction from "../models/Transaction.js";

//modules
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";

// others
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { dataPrices } from "../Mockdata/data.js";
import sendEmail from "../utils/sendEmail.js";
import generateAccountNumber from "../utils/generateAccountNumber.js";

const register = async (req, res) => {
  const { userName, email, password, userPin } = req.body;

  if (!userName || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  const userNameExists = await User.findOne({ userName });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  if (userNameExists) {
    throw new BadRequestError("Username already in use");
  }
  let user = await User.create({ userName, email, password, userPin });

  const token = user.createJWT();
  await generateAccountNumber({ email, userName });
  user = await User.findOne({ email });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      userName: user.userName,
      userType: user.userType,
      userBalance: user.userBalance,
      reservedAccBank: user.reservedAccBank,
      reservedAccBank2: user.reservedAccBank2,
      reservedAccNo: user.reservedAccNo,
      reservedAccNo2: user.reservedAccNo2,
    },
    transactions: [],
    token,
    dataSubscriptions: dataPrices,
  });
};
const login = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!password) {
    throw new BadRequestError("Please provide all values here");
  }
  let user = await User.findOne({ userName: userName || email }).select(
    "+password"
  );
  if (!user)
    user = await User.findOne({ email: userName || email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Wrong password");
  }
  const token = user.createJWT();
  if (!user.reservedAccNo)
    await generateAccountNumber({ userName: user.userName, email: user.email });

  const userTransactions = await Transaction.find({
    transBy: user._id,
  }).sort("-createdAt");
  user = await User.findOne({ userName: email || userName });
  user.password = undefined;
  await res.status(StatusCodes.OK).json({
    user,
    token,
    transactions: userTransactions,
    dataSubscriptions: dataPrices,
    isAdmin: process.env.ADMIN_ID == user._id,
  });
};
const fetchUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  const token = user.createJWT();
  user.password = undefined;
  const userTransactions = await Transaction.find({
    transBy: userId,
  }).sort("-createdAt");

  await res.status(StatusCodes.OK).json({
    user,
    token,
    transactions: userTransactions,
    dataSubscriptions: dataPrices,
    isAdmin: process.env.ADMIN_ID == user._id,
  });
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError("Please provide email");
  let user = await User.findOne({ email });
  if (!user) user = await User.findOne({ userName: email });
  if (!user)
    throw new BadRequestError("No user with this details has been registered");
  const token = await Token.findOne({ userId: user._id });
  if (token)
    throw new BadRequestError(
      "You just requested a password reset please check your email or try again later "
    );
  const resetToken = crypto.randomBytes(32).toString("hex");
  await new Token({ userId: user._id, token: resetToken }).save();
  const resetLink = `${process.env.FRONTEND_URL}/resetPassword/${user._id}/${resetToken}`;
  // send email
  const emailDetails = {
    email: user.email,
    subject: "Password Reset Request",
    payload: {
      name: user.userName,
      link: resetLink,
    },
    template: "../templates/forgetPassword.handlebars",
  };
  await sendEmail({ ...emailDetails });
  res.status(StatusCodes.OK).json({
    msg: "An email has been sent to you. Kindly check your email. Check spam folder if not found",
  });
};
const resetPassword = async (req, res) => {
  const { token, userId, newPassword, newPasswordCheck } = req.body;
  if (!newPassword || !newPasswordCheck || !token || !userId)
    throw new BadRequestError("All fields are are required");
  if (newPassword !== newPasswordCheck)
    throw new BadRequestError("Password not match");
  let resetToken = await Token.findOne({ token, userId });
  // console.log(resetToken);
  if (!resetToken) throw new BadRequestError("Invalid or expired reset token");
  const user = await User.findOne({ _id: userId });
  user.password = newPassword;
  await user.save();

  // send mail
  const emailDetails = {
    email: user.email,
    subject: "Password Reset Successful",
    payload: {
      name: user.userName,
      link: process.env.FRONTEND_URL,
    },
    template: "../templates/resetPassword.handlebars",
  };
  await sendEmail({ ...emailDetails });
  await resetToken.deleteOne();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Your password has been reset successfully" });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export {
  register,
  login,
  updateUser,
  fetchUser,
  resetPassword,
  forgetPassword,
};
