import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createQuestionSchema, updateQuestionSchema } from "./question.validation";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { QuestionControllers } from "./question.controller";

const router = Router();

router.post(
  "/",
  checkAuth(Role.EMPLOYER),
  validateRequest(createQuestionSchema),
  QuestionControllers.createQuestion
);

router.get(
  "/exam/:examId",
  checkAuth(Role.EMPLOYER, Role.CANDIDATE),
  QuestionControllers.getQuestionsByExam
);

router.get(
  "/:id",
  checkAuth(Role.EMPLOYER),
  QuestionControllers.getSingleQuestion
);

router.patch(
  "/:id",
  checkAuth(Role.EMPLOYER),
  validateRequest(updateQuestionSchema),
  QuestionControllers.updateQuestion
);

router.delete(
  "/:id",
  checkAuth(Role.EMPLOYER),
  QuestionControllers.deleteQuestion
);

export const QuestionRoutes = router;