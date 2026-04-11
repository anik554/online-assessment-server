import { Types } from "mongoose";

export interface IAnswer {
  questionId: string;
  selectedOptions?: string[]; // for MCQ
  textAnswer?: string; // for TEXT
}

export interface ISubmission {
  candidateId: Types.ObjectId;
  examId: Types.ObjectId;
  answers: IAnswer[];
  score?: number;
}
