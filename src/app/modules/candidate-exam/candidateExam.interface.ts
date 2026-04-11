import { Types } from "mongoose";

export interface ICandidateExam {
  candidateId: Types.ObjectId;
  examId: Types.ObjectId;
  status: "PENDING" | "STARTED" | "COMPLETED";
  startedAt?: Date;
  submittedAt?: Date;
}