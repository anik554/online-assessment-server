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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const submission_service_1 = require("./submission.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createSubmission = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const candidateId = req.user.userId; // from JWT middleware
    const result = yield submission_service_1.SubmissionServices.createSubmission(candidateId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Submission created successfully",
        data: result,
    });
}));
const getMySubmissions = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const candidateId = req.user.userId;
    const result = yield submission_service_1.SubmissionServices.getMySubmissions(candidateId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "My submissions retrieved successfully",
        data: result,
    });
}));
const getSingleSubmission = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield submission_service_1.SubmissionServices.getSubmissionById(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Submission retrieved successfully",
        data: result,
    });
}));
const getSubmissionsByExam = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield submission_service_1.SubmissionServices.getSubmissionsByExam(req.params.examId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Exam submissions retrieved successfully",
        data: result,
    });
}));
const updateSubmissionScore = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { score } = req.body;
    const result = yield submission_service_1.SubmissionServices.updateSubmissionScore(req.params.id, score);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Submission score updated successfully",
        data: result,
    });
}));
const deleteSubmission = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield submission_service_1.SubmissionServices.deleteSubmission(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Submission deleted successfully",
        data: null,
    });
}));
exports.SubmissionControllers = {
    createSubmission,
    getMySubmissions,
    getSingleSubmission,
    getSubmissionsByExam,
    updateSubmissionScore,
    deleteSubmission,
};
