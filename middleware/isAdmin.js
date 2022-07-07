import { BadRequestError } from "../errors/index.js";

const isAdmin = (req, res, next) => {
  if (req.user.userId !== process.env.ADMIN_ID)
    throw new BadRequestError("You are not authorized to perform this action");
  next();
};

export default isAdmin;
