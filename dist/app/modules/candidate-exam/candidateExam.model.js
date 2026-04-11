"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateExam = void 0;
const mongoose_1 = require("mongoose");
const candidateExamSchema = new mongoose_1.Schema({
    candidateId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    examId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "STARTED", "COMPLETED"],
        default: "PENDING",
    },
    startedAt: Date,
    submittedAt: Date,
}, { timestamps: true });
exports.CandidateExam = (0, mongoose_1.model)("CandidateExam", candidateExamSchema);
