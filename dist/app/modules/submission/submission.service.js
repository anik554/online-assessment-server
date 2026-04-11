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
exports.SubmissionServices = void 0;
const mongoose_1 = require("mongoose");
const submission_model_1 = require("./submission.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createSubmission = (candidateId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const submission = yield submission_model_1.Submission.create(Object.assign(Object.assign({}, payload), { candidateId: new mongoose_1.Types.ObjectId(candidateId) }));
    return submission;
});
const getMySubmissions = (candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    const submissions = yield submission_model_1.Submission.find({
        candidateId: new mongoose_1.Types.ObjectId(candidateId),
    })
        .populate("examId", "title duration startTime endTime")
        .sort({ createdAt: -1 });
    return submissions;
});
const getSubmissionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const submission = yield submission_model_1.Submission.findById(id)
        .populate("examId", "title")
        .populate("answers.questionId", "title type");
    if (!submission) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Submission not found");
    }
    return submission;
});
const getSubmissionsByExam = (examId) => __awaiter(void 0, void 0, void 0, function* () {
    const submissions = yield submission_model_1.Submission.find({
        examId: new mongoose_1.Types.ObjectId(examId),
    })
        .populate("candidateId", "name email")
        .sort({ createdAt: -1 });
    return submissions;
});
const updateSubmissionScore = (id, score) => __awaiter(void 0, void 0, void 0, function* () {
    const submission = yield submission_model_1.Submission.findByIdAndUpdate(id, { score }, { new: true });
    if (!submission) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Submission not found");
    }
    return submission;
});
const deleteSubmission = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const submission = yield submission_model_1.Submission.findByIdAndDelete(id);
    if (!submission) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Submission not found");
    }
});
exports.SubmissionServices = {
    createSubmission,
    getMySubmissions,
    getSubmissionById,
    getSubmissionsByExam,
    updateSubmissionScore,
    deleteSubmission,
};
