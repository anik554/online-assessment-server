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
exports.ExamServices = void 0;
const exam_model_1 = require("./exam.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const mongoose_1 = require("mongoose");
const createExam = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield exam_model_1.Exam.create(Object.assign(Object.assign({}, payload), { createdBy: userId }));
    return exam;
});
const getAllExams = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 8;
    const search = query.search || "";
    const skip = (page - 1) * limit;
    // 🔍 Search filter
    const filter = search
        ? {
            title: { $regex: search, $options: "i" },
        }
        : {};
    const [data, total] = yield Promise.all([
        exam_model_1.Exam.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        exam_model_1.Exam.countDocuments(filter),
    ]);
    return {
        data,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getMyExams = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        createdBy: new mongoose_1.Types.ObjectId(userId),
    };
    if (query.search) {
        filter.title = { $regex: query.search, $options: "i" };
    }
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const [data, total] = yield Promise.all([
        exam_model_1.Exam.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        exam_model_1.Exam.countDocuments(filter),
    ]);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data,
    };
});
const getSingleExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield exam_model_1.Exam.findById(id);
    if (!exam) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Exam not found");
    }
    return exam;
});
const updateExam = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield exam_model_1.Exam.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!exam) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Exam not found");
    }
    return exam;
});
const deleteExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield exam_model_1.Exam.findByIdAndDelete(id);
    if (!exam) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Exam not found");
    }
    return null;
});
exports.ExamServices = {
    createExam,
    getAllExams,
    getMyExams,
    getSingleExam,
    updateExam,
    deleteExam,
};
