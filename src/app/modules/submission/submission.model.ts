import { Schema, model } from "mongoose";
import { ISubmission } from "./submission.interface";

const answerSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    selectedOptions: [String],
    textAnswer: String,
  },
  { _id: false },
);

const submissionSchema = new Schema<ISubmission>(
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
    answers: [answerSchema],
    score: Number,
  },
  { timestamps: true },
);

export const Submission = model<ISubmission>(
  "Submission",
  submissionSchema,
);