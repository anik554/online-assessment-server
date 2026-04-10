export interface IAnswer {
  questionId: string;
  selectedOptions?: string[]; // for MCQ
  textAnswer?: string; // for TEXT
}

export interface ISubmission {
  candidateId: string;
  examId: string;
  answers: IAnswer[];
  score?: number;
}