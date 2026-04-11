"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const getRedirectUrlByRole_1 = require("../../utils/getRedirectUrlByRole");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExisting = yield user_model_1.User.findOne({
        email: email === null || email === void 0 ? void 0 : email.toLowerCase(),
    });
    if (!isExisting) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, isExisting.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    const jwtPayload = {
        userId: isExisting._id,
        email: isExisting.email,
        role: isExisting.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, { expiresIn: env_1.envVars.JWT_ACCESS_EXPIRES });
    const redirectUrl = (0, getRedirectUrlByRole_1.getRedirectUrlByRole)(isExisting.role);
    return {
        accessToken,
        role: isExisting.role,
        redirectUrl,
    };
});
exports.AuthServices = {
    loginUser,
};
