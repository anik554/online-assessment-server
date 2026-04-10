import { Schema, model } from "mongoose";
import { ICandidateExam } from "./candidateExam.interface";

const candidateExamSchema = new Schema<ICandidateExam>(
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
    status: {
      type: String,
      enum: ["PENDING", "STARTED", "COMPLETED"],
      default: "PENDING",
    },
    startedAt: Date,
    submittedAt: Date,
  },
  { timestamps: true },
);

export const CandidateExam = model<ICandidateExam>(
  "CandidateExam",
  candidateExamSchema,
);