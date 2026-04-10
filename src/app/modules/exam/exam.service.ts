import { JwtPayload } from "jsonwebtoken";
import { Exam } from "./exam.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Types } from "mongoose";

const createExam = async (userId: string, payload: JwtPayload) => {
  const exam = await Exam.create({
    ...payload,
    createdBy: userId,
  });

  return exam;
};

const getAllExams = async () => {
  return Exam.find().sort({ createdAt: -1 });
};

const getMyExams = async (userId: string, query: Record<string, any>) => {
  const filter: any = {
    createdBy: new Types.ObjectId(userId),
  };

  if (query.search) {
    filter.title = { $regex: query.search, $options: "i" };
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Exam.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Exam.countDocuments(filter),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};

const getSingleExam = async (id: string) => {
  const exam = await Exam.findById(id);

  if (!exam) {
    throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  }

  return exam;
};

const updateExam = async (id: string, payload: any) => {
  const exam = await Exam.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!exam) {
    throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  }

  return exam;
};

const deleteExam = async (id: string) => {
  const exam = await Exam.findByIdAndDelete(id);

  if (!exam) {
    throw new AppError(httpStatus.NOT_FOUND, "Exam not found");
  }

  return null;
};

export const ExamServices = {
  createExam,
  getAllExams,
  getMyExams,
  getSingleExam,
  updateExam,
  deleteExam,
};
