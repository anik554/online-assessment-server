import { z } from "zod";

export const createExamSchema = z.object({
  title: z.string(),
  totalCandidates: z.number(),
  totalSlots: z.number(),
  questionType: z.enum(["MCQ", "TEXT"]),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.number(),
});

export const updateExamSchema = z.object({
  title: z.string().optional(),
  totalCandidates: z.number().optional(),
  totalSlots: z.number().optional(),
  questionType: z.enum(["MCQ", "TEXT"]).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  duration: z.number().optional(),
});
