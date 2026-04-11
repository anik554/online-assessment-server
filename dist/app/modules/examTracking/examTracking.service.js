"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamTrackingServices = void 0;
const examTracking_model_1 = require("./examTracking.model");
const createTrackingLog = (userId, payload, req) => __awaiter(void 0, void 0, void 0, function* () {
    const tracking = yield examTracking_model_1.ExamTracking.create({
        candidateId: userId,
        examId: payload.examId,
        eventType: payload.eventType,
        meta: {
            userAgent: req.headers["user-agent"],
            ip: req.ip,
        },
    });
    return tracking;
});
const getExamLogs = (examId) => __awaiter(void 0, void 0, void 0, function* () {
    return examTracking_model_1.ExamTracking.find({ examId })
        .populate("candidateId", "name email")
        .sort({ createdAt: -1 });
});
exports.ExamTrackingServices = {
    createTrackingLog,
    getExamLogs,
};
