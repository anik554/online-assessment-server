import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ExamRoutes } from "../modules/exam/exam.route";
import { QuestionRoutes } from "../modules/question/question.route";
import { SubmissionRoutes } from "../modules/submission/submission.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/exam",
    route: ExamRoutes,
  },
  {
    path: "/questions",
    route: QuestionRoutes,
  },
  {
    path: "/submissions",
    route: SubmissionRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
