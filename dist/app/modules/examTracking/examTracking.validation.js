"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrackingSchema = void 0;
const zod_1 = require("zod");
exports.createTrackingSchema = zod_1.z.object({
    examId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid examId"),
    eventType: zod_1.z.enum([
        "TAB_SWITCH",
        "FULLSCREEN_EXIT",
        "WINDOW_BLUR",
        "WINDOW_FOCUS",
    ]),
});
