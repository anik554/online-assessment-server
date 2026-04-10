import { Types } from "mongoose";

export interface IExam {
  title: string;
  totalCandidates: number;
  totalSlots: number;
  questionSets: string[];
  questionType: "MCQ" | "TEXT";
  startTime: Date;
  endTime: Date;
  duration: number;
  createdBy: Types.ObjectId;
}
