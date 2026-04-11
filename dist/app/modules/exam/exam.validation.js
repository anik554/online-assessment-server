"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExamSchema = exports.createExamSchema = void 0;
const zod_1 = require("zod");
exports.createExamSchema = zod_1.z.object({
    title: zod_1.z.string(),
    totalCandidates: zod_1.z.number(),
    totalSlots: zod_1.z.number(),
    questionType: zod_1.z.enum(["MCQ", "TEXT"]),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string(),
    duration: zod_1.z.number(),
});
exports.updateExamSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    totalCandidates: zod_1.z.number().optional(),
    totalSlots: zod_1.z.number().optional(),
    questionType: zod_1.z.enum(["MCQ", "TEXT"]).optional(),
    startTime: zod_1.z.string().optional(),
    endTime: zod_1.z.string().optional(),
    duration: zod_1.z.number().optional(),
});
