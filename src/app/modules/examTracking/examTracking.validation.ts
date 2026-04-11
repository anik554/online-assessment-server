import { z } from "zod";

export const createTrackingSchema = z.object({
  examId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid examId"),
  eventType: z.enum([
    "TAB_SWITCH",
    "FULLSCREEN_EXIT",
    "WINDOW_BLUR",
    "WINDOW_FOCUS",
  ]),
});

export type CreateTrackingInput = z.infer<typeof createTrackingSchema>;
