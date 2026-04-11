"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const optionSchema = new mongoose_1.Schema({
    text: String,
    isCorrect: Boolean,
}, { _id: false, versionKey: false });
const questionSchema = new mongoose_1.Schema({
    examId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
    },
    title: { type: String, required: true },
    type: {
        type: String,
        enum: ["CHECKBOX", "RADIO", "TEXT"],
        required: true,
    },
    options: [optionSchema],
}, { timestamps: true, versionKey: false });
exports.Question = (0, mongoose_1.model)("Question", questionSchema);
