import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envVars } from "../../config/env";
import { getRedirectUrlByRole } from "../../utils/getRedirectUrlByRole";

const loginUser = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isExisting = await User.findOne({
    email: email?.toLowerCase(),
  });

  console.log("payload",payload)

  if (!isExisting) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const isPasswordMatched = await bcrypt.compare(
    password!,
    isExisting.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    userId: isExisting._id,
    email: isExisting.email,
    role: isExisting.role,
  };

  const accessToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET!, {
    expiresIn: envVars.JWT_ACCESS_EXPIRES,
  });

  const redirectUrl = getRedirectUrlByRole(isExisting.role);

  return {
    accessToken,
    role: isExisting.role,
    redirectUrl,
  };
};

export const AuthServices = {
  loginUser,
};
