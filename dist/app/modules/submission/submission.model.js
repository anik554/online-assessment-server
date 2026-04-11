"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submission = void 0;
const mongoose_1 = require("mongoose");
const answerSchema = new mongoose_1.Schema({
    questionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Question",
    },
    selectedOptions: [String],
    textAnswer: String,
}, { _id: false });
const submissionSchema = new mongoose_1.Schema({
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
    answers: [answerSchema],
    score: Number,
}, { timestamps: true });
exports.Submission = (0, mongoose_1.model)("Submission", submissionSchema);
