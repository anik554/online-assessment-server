import { Types } from "mongoose";

export type TrackingEventType =
  | "TAB_SWITCH"
  | "FULLSCREEN_EXIT"
  | "WINDOW_BLUR"
  | "WINDOW_FOCUS";

export interface IExamTracking {
  candidateId: Types.ObjectId;
  examId: Types.ObjectId;
  eventType: TrackingEventType;
  timestamp: Date;
  meta?: {
    userAgent?: string;
    ip?: string;
  };
}
