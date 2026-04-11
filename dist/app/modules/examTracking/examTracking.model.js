"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamTracking = void 0;
const mongoose_1 = require("mongoose");
const examTrackingSchema = new mongoose_1.Schema({
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
    eventType: {
        type: String,
        enum: ["TAB_SWITCH", "FULLSCREEN_EXIT", "WINDOW_BLUR", "WINDOW_FOCUS"],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    meta: {
        userAgent: String,
        ip: String,
    },
}, { timestamps: true });
exports.ExamTracking = (0, mongoose_1.model)("ExamTracking", examTrackingSchema);
