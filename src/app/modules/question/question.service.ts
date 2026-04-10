import { Types } from "mongoose";
import { Question } from "./question.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { IQuestion } from "./question.interface";

const createQuestion = async (payload: any): Promise<IQuestion> => {
  // Auto handle TEXT type (remove options if sent)
  if (payload.type === "TEXT") {
    payload.options = [];
  }

  const question = await Question.create(payload);
  return question;
};

const getQuestionsByExam = async (examId: string): Promise<IQuestion[]> => {
  const questions = await Question.find({
    examId: new Types.ObjectId(examId),
  }).sort({ createdAt: -1 });

  return questions;
};

const getSingleQuestion = async (id: string): Promise<IQuestion> => {
  const question = await Question.findById(id);

  if (!question) {
    throw new AppError(httpStatus.NOT_FOUND, "Question not found");
  }

  return question;
};

const updateQuestion = async (id: string, payload: any): Promise<IQuestion> => {
  // Auto handle TEXT type
  if (payload.type === "TEXT") {
    payload.options = [];
  }

  const question = await Question.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!question) {
    throw new AppError(httpStatus.NOT_FOUND, "Question not found");
  }

  return question;
};

const deleteQuestion = async (id: string): Promise<void> => {
  const question = await Question.findByIdAndDelete(id);

  if (!question) {
    throw new AppError(httpStatus.NOT_FOUND, "Question not found");
  }
};

export const QuestionServices = {
  createQuestion,
  getQuestionsByExam,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
