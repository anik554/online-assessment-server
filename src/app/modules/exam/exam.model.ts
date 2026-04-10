import { Schema, model } from "mongoose";
import { IExam } from "./exam.interface";

const examSchema = new Schema<IExam>(
  {
    title: { type: String, required: true },
    totalCandidates: { type: Number, required: true },
    totalSlots: { type: Number, required: true },
    questionType: {
      type: String,
      enum: ["MCQ", "TEXT"],
      required: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Exam = model<IExam>("Exam", examSchema);
