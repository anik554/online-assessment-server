import { Schema, model } from "mongoose";
import { IQuestion } from "./question.interface";

const optionSchema = new Schema(
  {
    text: String,
    isCorrect: Boolean,
  },
  { _id: false, versionKey: false },
);

const questionSchema = new Schema<IQuestion>(
  {
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["CHECKBOX", "RADIO", "TEXT"],
      required: true,
    },
    options: [optionSchema],
  },
  { timestamps: true, versionKey: false },
);

export const Question = model<IQuestion>("Question", questionSchema);
