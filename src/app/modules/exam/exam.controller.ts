import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ExamServices } from "./exam.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createExam = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const result = await ExamServices.createExam(userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Exam created successfully",
    data: result,
  });
});

const getAllExams = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamServices.getAllExams();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exams retrieved successfully",
    data: result,
  });
});

const getMyExams = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const result = await ExamServices.getMyExams(userId, undefined);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My exams retrieved",
    data: result,
  });
});

const getSingleExam = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamServices.getSingleExam(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam retrieved",
    data: result,
  });
});

const updateExam = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamServices.updateExam(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam updated successfully",
    data: result,
  });
});

const deleteExam = catchAsync(async (req: Request, res: Response) => {
  await ExamServices.deleteExam(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam deleted successfully",
    data: null,
  });
});

export const ExamControllers = {
  createExam,
  getAllExams,
  getMyExams,
  getSingleExam,
  updateExam,
  deleteExam,
};
