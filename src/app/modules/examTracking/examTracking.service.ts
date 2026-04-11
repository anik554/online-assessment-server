import { ExamTracking } from "./examTracking.model";

const createTrackingLog = async (userId: string, payload: any, req: any) => {
  const tracking = await ExamTracking.create({
    candidateId: userId,
    examId: payload.examId,
    eventType: payload.eventType,
    meta: {
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    },
  });

  return tracking;
};

const getExamLogs = async (examId: string) => {
  return ExamTracking.find({ examId })
    .populate("candidateId", "name email")
    .sort({ createdAt: -1 });
};

export const ExamTrackingServices = {
  createTrackingLog,
  getExamLogs,
};
