"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubmissionSchema = exports.createSubmissionSchema = void 0;
const zod_1 = require("zod");
const answerSchema = zod_1.z.object({
    questionId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid questionId"),
    selectedOptions: zod_1.z.array(zod_1.z.string()).optional(),
    textAnswer: zod_1.z.string().optional(),
});
exports.createSubmissionSchema = zod_1.z.object({
    examId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid examId"),
    answers: zod_1.z
        .array(answerSchema)
        .min(1, "At least one answer is required")
        .superRefine((answers, ctx) => {
        answers.forEach((answer, index) => {
            if (!answer.selectedOptions && !answer.textAnswer) {
                ctx.addIssue({
                    code: "custom",
                    path: ["answers", index],
                    message: "Answer must have either selectedOptions or textAnswer",
                });
            }
        });
    }),
});
exports.updateSubmissionSchema = zod_1.z.object({
    score: zod_1.z.number().min(0).optional(),
});
