import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/queryBuilder";
import { userSearchableFields } from "./user.constant";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
  const { name, email, password } = payload;
  const isExisting = await User.findOne({ email });

  if (isExisting) {
    throw new AppError(httpStatus.CONFLICT, "User Already Existing");
  }

  const hashedPassword = await bcrypt.hash(password!, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

const getAllUsers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query);
  const usersData = queryBuilder
    .filter()
    .search(userSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    usersData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
};
