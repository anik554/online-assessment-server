"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const exam_route_1 = require("../modules/exam/exam.route");
const question_route_1 = require("../modules/question/question.route");
const submission_route_1 = require("../modules/submission/submission.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/exam",
        route: exam_route_1.ExamRoutes,
    },
    {
        path: "/questions",
        route: question_route_1.QuestionRoutes,
    },
    {
        path: "/submissions",
        route: submission_route_1.SubmissionRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
