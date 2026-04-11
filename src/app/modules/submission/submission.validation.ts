import { z } from "zod";

const answerSchema = z.object({
  questionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid questionId"),
  selectedOptions: z.array(z.string()).optional(),
  textAnswer: z.string().optional(),
});

export const createSubmissionSchema = z.object({
  examId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid examId"),
  answers: z
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

export const updateSubmissionSchema = z.object({
  score: z.number().min(0).optional(),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;
export type UpdateSubmissionInput = z.infer<typeof updateSubmissionSchema>;
