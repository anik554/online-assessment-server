import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { createTrackingSchema } from "./examTracking.validation";
import { ExamTrackingControllers } from "./examTracking.controller";

const router = Router();

router.post(
  "/",
  checkAuth(Role.CANDIDATE),
  validateRequest(createTrackingSchema),
  ExamTrackingControllers.createLog,
);

router.get(
  "/:examId",
  checkAuth(Role.EMPLOYER),
  ExamTrackingControllers.getLogs,
);

export const ExamTrackingRoutes = router;
