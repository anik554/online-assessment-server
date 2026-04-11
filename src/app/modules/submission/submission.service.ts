import { Types } from "mongoose";
import { Submission } from "./submission.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { ISubmission } from "./submission.interface";

const createSubmission = async (candidateId: string, payload: any): Promise<ISubmission> => {
  const submission = await Submission.create({
    ...payload,
    candidateId: new Types.ObjectId(candidateId),
  });

  return submission;
};

const getMySubmissions = async (candidateId: string) => {
  const submissions = await Submission.find({
    candidateId: new Types.ObjectId(candidateId),
  })
    .populate("examId", "title duration startTime endTime")
    .sort({ createdAt: -1 });

  return submissions;
};

const getSubmissionById = async (id: string): Promise<ISubmission> => {
  const submission = await Submission.findById(id)
    .populate("examId", "title")
    .populate("answers.questionId", "title type");

  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }

  return submission;
};

const getSubmissionsByExam = async (examId: string) => {
  const submissions = await Submission.find({
    examId: new Types.ObjectId(examId),
  })
    .populate("candidateId", "name email")
    .sort({ createdAt: -1 });

  return submissions;
};

const updateSubmissionScore = async (id: string, score: number): Promise<ISubmission> => {
  const submission = await Submission.findByIdAndUpdate(
    id,
    { score },
    { new: true }
  );

  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }

  return submission;
};

const deleteSubmission = async (id: string): Promise<void> => {
  const submission = await Submission.findByIdAndDelete(id);

  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }
};

export const SubmissionServices = {
  createSubmission,
  getMySubmissions,
  getSubmissionById,
  getSubmissionsByExam,
  updateSubmissionScore,
  deleteSubmission,
};