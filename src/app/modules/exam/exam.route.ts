import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createExamSchema, updateExamSchema } from "./exam.validation";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { ExamControllers } from "./exam.controller";

const router = Router();

router.post(
  "/",
  checkAuth(Role.EMPLOYER),
  validateRequest(createExamSchema),
  ExamControllers.createExam,
);

router.get("/", checkAuth(Role.CANDIDATE,Role.EMPLOYER), ExamControllers.getAllExams);

router.get("/my", checkAuth(Role.EMPLOYER), ExamControllers.getMyExams);

router.get("/:id", checkAuth(Role.EMPLOYER), ExamControllers.getSingleExam);

router.patch(
  "/:id",
  checkAuth(Role.EMPLOYER),
  validateRequest(updateExamSchema),
  ExamControllers.updateExam,
);

router.delete("/:id", checkAuth(Role.EMPLOYER), ExamControllers.deleteExam);

export const ExamRoutes = router;
