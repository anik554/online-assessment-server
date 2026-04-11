import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createSubmissionSchema,
  updateSubmissionSchema,
} from "./submission.validation";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { SubmissionControllers } from "./submission.controller";

const router = Router();

router.post(
  "/",
  checkAuth(Role.CANDIDATE),
  validateRequest(createSubmissionSchema),
  SubmissionControllers.createSubmission,
);

router.get(
  "/my",
  checkAuth(Role.CANDIDATE),
  SubmissionControllers.getMySubmissions,
);

router.get(
  "/:id",
  checkAuth(Role.CANDIDATE, Role.EMPLOYER),
  SubmissionControllers.getSingleSubmission,
);

router.get(
  "/exam/:examId",
  checkAuth(Role.EMPLOYER),
  SubmissionControllers.getSubmissionsByExam,
);

router.patch(
  "/:id/score",
  checkAuth(Role.EMPLOYER),
  validateRequest(updateSubmissionSchema),
  SubmissionControllers.updateSubmissionScore,
);

router.delete(
  "/:id",
  checkAuth(Role.EMPLOYER),
  SubmissionControllers.deleteSubmission,
);

export const SubmissionRoutes = router;
