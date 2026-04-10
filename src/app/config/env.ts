import dotenv from "dotenv";

dotenv.config();

export const envVars = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
  BCRYPT_SOLT_ROUND: process.env.BCRYPT_SOLT_ROUND as string,
  EMPLOYER_EMAIL: process.env.EMPLOYER_EMAIL as string,
  EMPLOYER_PASSWORD: process.env.EMPLOYER_PASSWORD as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string
};
