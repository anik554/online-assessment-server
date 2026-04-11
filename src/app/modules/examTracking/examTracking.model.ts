import { Schema, model } from "mongoose";
import { IExamTracking } from "./examTracking.interface";

const examTrackingSchema = new Schema<IExamTracking>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    eventType: {
      type: String,
      enum: ["TAB_SWITCH", "FULLSCREEN_EXIT", "WINDOW_BLUR", "WINDOW_FOCUS"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    meta: {
      userAgent: String,
      ip: String,
    },
  },
  { timestamps: true },
);

export const ExamTracking = model<IExamTracking>(
  "ExamTracking",
  examTrackingSchema,
);
