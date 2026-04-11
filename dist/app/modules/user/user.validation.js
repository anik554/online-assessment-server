"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .min(1, { message: "Name is required" })
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" }),
    email: zod_1.z
        .email("Invalid email format")
        .min(1, { message: "Email is required" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(100, { message: "Password cannot exceed 100 characters" }),
    role: zod_1.z
        .enum(Object.values(user_interface_1.Role))
        .optional(),
    isActive: zod_1.z
        .enum(Object.values(user_interface_1.IsActive))
        .optional(),
})
    .strict();
