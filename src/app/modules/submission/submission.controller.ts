import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { SubmissionServices } from "./submission.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createSubmission = catchAsync(async (req: Request, res: Response) => {
  const candidateId = req.user.userId;   // from JWT middleware

  const result = await SubmissionServices.createSubmission(candidateId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Submission created successfully",
    data: result,
  });
});

const getMySubmissions = catchAsync(async (req: Request, res: Response) => {
  const candidateId = req.user.userId;

  const result = await SubmissionServices.getMySubmissions(candidateId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My submissions retrieved successfully",
    data: result,
  });
});

const getSingleSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await SubmissionServices.getSubmissionById(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Submission retrieved successfully",
    data: result,
  });
});

const getSubmissionsByExam = catchAsync(async (req: Request, res: Response) => {
  const result = await SubmissionServices.getSubmissionsByExam(req.params.examId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam submissions retrieved successfully",
    data: result,
  });
});

const updateSubmissionScore = catchAsync(async (req: Request, res: Response) => {
  const { score } = req.body;

  const result = await SubmissionServices.updateSubmissionScore(
    req.params.id as string,
    score
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Submission score updated successfully",
    data: result,
  });
});

const deleteSubmission = catchAsync(async (req: Request, res: Response) => {
  await SubmissionServices.deleteSubmission(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Submission deleted successfully",
    data: null,
  });
});

export const SubmissionControllers = {
  createSubmission,
  getMySubmissions,
  getSingleSubmission,
  getSubmissionsByExam,
  updateSubmissionScore,
  deleteSubmission,
};