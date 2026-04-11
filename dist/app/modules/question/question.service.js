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
exports.QuestionServices = void 0;
const mongoose_1 = require("mongoose");
const question_model_1 = require("./question.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createQuestion = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Auto handle TEXT type (remove options if sent)
    if (payload.type === "TEXT") {
        payload.options = [];
    }
    const question = yield question_model_1.Question.create(payload);
    return question;
});
const getQuestionsByExam = (examId) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield question_model_1.Question.find({
        examId: new mongoose_1.Types.ObjectId(examId),
    }).sort({ createdAt: -1 });
    return questions;
});
const getSingleQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield question_model_1.Question.findById(id);
    if (!question) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Question not found");
    }
    return question;
});
const updateQuestion = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Auto handle TEXT type
    if (payload.type === "TEXT") {
        payload.options = [];
    }
    const question = yield question_model_1.Question.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!question) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Question not found");
    }
    return question;
});
const deleteQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield question_model_1.Question.findByIdAndDelete(id);
    if (!question) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Question not found");
    }
});
exports.QuestionServices = {
    createQuestion,
    getQuestionsByExam,
    getSingleQuestion,
    updateQuestion,
    deleteQuestion,
};
