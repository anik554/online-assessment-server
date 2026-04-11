"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.envVars = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
    BCRYPT_SOLT_ROUND: process.env.BCRYPT_SOLT_ROUND,
    EMPLOYER_EMAIL: process.env.EMPLOYER_EMAIL,
    EMPLOYER_PASSWORD: process.env.EMPLOYER_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL
};
