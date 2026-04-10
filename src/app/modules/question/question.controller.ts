import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { QuestionServices } from "./question.service";

const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionServices.createQuestion(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Question created successfully",
    data: result,
  });
});

const getQuestionsByExam = catchAsync(async (req: Request, res: Response) => {
  const { examId } = req.params;

  const result = await QuestionServices.getQuestionsByExam(examId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Questions retrieved successfully",
    data: result,
  });
});

const getSingleQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionServices.getSingleQuestion(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question retrieved successfully",
    data: result,
  });
});

const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionServices.updateQuestion(
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question updated successfully",
    data: result,
  });
});

const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  await QuestionServices.deleteQuestion(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question deleted successfully",
    data: null,
  });
});

export const QuestionControllers = {
  createQuestion,
  getQuestionsByExam,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};