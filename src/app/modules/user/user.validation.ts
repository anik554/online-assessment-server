import { z } from "zod";
import { Role, IsActive } from "./user.interface";

export const createUserZodSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name cannot exceed 50 characters" }),

    email: z
      .email("Invalid email format")
      .min(1, { message: "Email is required" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password cannot exceed 100 characters" }),

    role: z
      .enum(Object.values(Role) as [string, ...string[]])
      .optional(),

    isActive: z
      .enum(Object.values(IsActive) as [string, ...string[]])
      .optional(),
  })
  .strict();