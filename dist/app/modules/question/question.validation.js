"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestionSchema = exports.createQuestionSchema = void 0;
const zod_1 = require("zod");
const optionSchema = zod_1.z.object({
    text: zod_1.z.string().min(1, "Option text is required"),
    isCorrect: zod_1.z.boolean(),
});
const baseQuestionSchema = zod_1.z.object({
    examId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid examId"),
    title: zod_1.z.string().min(3, "Title must be at least 3 characters long"),
    type: zod_1.z.enum(["CHECKBOX", "RADIO", "TEXT"]),
    options: zod_1.z.array(optionSchema).optional(),
});
// Separate schema for create (with full validation)
exports.createQuestionSchema = baseQuestionSchema.superRefine((data, ctx) => {
    if (data.type === "TEXT") {
        if (data.options && data.options.length > 0) {
            ctx.addIssue({
                code: "custom",
                path: ["options"],
                message: "TEXT type questions cannot have options",
            });
        }
    }
    else {
        // RADIO or CHECKBOX
        if (!data.options || data.options.length === 0) {
            ctx.addIssue({
                code: "custom",
                path: ["options"],
                message: "RADIO and CHECKBOX questions must have at least one option",
            });
        }
        // For RADIO: exactly one correct answer
        if (data.type === "RADIO" && data.options) {
            const correctCount = data.options.filter((opt) => opt.isCorrect).length;
            if (correctCount !== 1) {
                ctx.addIssue({
                    code: "custom",
                    path: ["options"],
                    message: "RADIO questions must have exactly one correct option",
                });
            }
        }
    }
});
// For update - we create a simpler partial version without superRefine
// (Zod v4 does not allow .partial() on schemas that use superRefine/refine)
exports.updateQuestionSchema = baseQuestionSchema.partial().superRefine((data, ctx) => {
    // Lighter validation for update (only if type and options are both provided)
    if (data.type === "TEXT" && data.options && data.options.length > 0) {
        ctx.addIssue({
            code: "custom",
            path: ["options"],
            message: "TEXT type questions cannot have options",
        });
    }
    if (data.type && data.type !== "TEXT") {
        if (data.options && data.options.length === 0) {
            ctx.addIssue({
                code: "custom",
                path: ["options"],
                message: "RADIO and CHECKBOX questions must have at least one option",
            });
        }
        if (data.type === "RADIO" && data.options) {
            const correctCount = data.options.filter((opt) => opt.isCorrect).length;
            if (correctCount !== 1) {
                ctx.addIssue({
                    code: "custom",
                    path: ["options"],
                    message: "RADIO questions must have exactly one correct option",
                });
            }
        }
    }
});
