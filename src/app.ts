import express, { Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import cors from "cors";
import { router } from "./app/routers";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://online-assessment-dusky.vercel.app"
    ],
    credentials: true,
  })
);
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Online Assessment Platform Backend",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
