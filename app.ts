import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import logger from "./middleware/logger";

import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";

export const app: Application = express();

//cors=> cross origin resource sharing
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

//cookie parser
app.use(cookieParser());

//body parser
app.use(express.json({ limit: "50mb" }));

// app.use((req, res, next) => {
//   console.log("req user is: ", req.user);
//   console.log("req cookie is: ", req.cookies);
//   console.log("req signed cookie is: ", req.signedCookies);
//   next();
// });

//logger
app.use(logger);

//routes
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);

//testing api route
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

app.use(ErrorMiddleware);
// app.use(express.urlencoded({ extended: true }));
// app.use("/api", require("./routes/api"));

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });
