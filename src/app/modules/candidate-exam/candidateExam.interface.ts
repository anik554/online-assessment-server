export interface ICandidateExam {
  candidateId: string;
  examId: string;
  status: "PENDING" | "STARTED" | "COMPLETED";
  startedAt?: Date;
  submittedAt?: Date;
}