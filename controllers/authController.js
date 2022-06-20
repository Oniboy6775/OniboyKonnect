// models
import User from "../models/User.js";

// others
import Transaction from "../models/Transaction.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { dataPrices } from "../Mockdata/data.js";

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
  const user = await User.create({ userName, email, password, userPin });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      userName: user.userName,
      userType: user.userType,
      userBalance: user.userBalance,
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
  user.password = undefined;
  const userTransactions = await Transaction.find({
    transBy: user._id,
  });

  await res.status(StatusCodes.OK).json({
    user,
    token,
    transactions: userTransactions,
    dataSubscriptions: dataPrices,
  });
};
const fetchUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  const token = user.createJWT();
  user.password = undefined;
  const userTransactions = await Transaction.find({
    transBy: userId,
  });

  await res.status(StatusCodes.OK).json({
    user,
    token,
    transactions: userTransactions,
    dataSubscriptions: dataPrices,
  });
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

export { register, login, updateUser, fetchUser };
