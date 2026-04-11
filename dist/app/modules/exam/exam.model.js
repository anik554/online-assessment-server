"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exam = void 0;
const mongoose_1 = require("mongoose");
const examSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    totalCandidates: { type: Number, required: true },
    totalSlots: { type: Number, required: true },
    questionType: {
        type: String,
        enum: ["MCQ", "TEXT"],
        required: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true, versionKey: false });
exports.Exam = (0, mongoose_1.model)("Exam", examSchema);
