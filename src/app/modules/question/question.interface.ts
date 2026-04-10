import { Types } from "mongoose";

export type QuestionType = "CHECKBOX" | "RADIO" | "TEXT";

export interface IOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  examId: Types.ObjectId;
  title: string;
  type: QuestionType;
  options?: IOption[];
}
