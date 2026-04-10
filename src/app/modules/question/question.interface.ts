export type QuestionType = "CHECKBOX" | "RADIO" | "TEXT";

export interface IOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  examId: string;
  title: string;
  type: QuestionType;
  options?: IOption[];
}