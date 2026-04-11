import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ExamTrackingServices } from "./examTracking.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createLog = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const result = await ExamTrackingServices.createTrackingLog(
    userId,
    req.body,
    req,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Tracking log created",
    data: result,
  });
});

const getLogs = catchAsync(async (req: Request, res: Response) => {
  const { examId } = req.params;

  const result = await ExamTrackingServices.getExamLogs(examId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tracking logs retrieved",
    data: result,
  });
});

export const ExamTrackingControllers = {
  createLog,
  getLogs,
};
