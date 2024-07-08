import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import { CatchAsyncErrors } from "./catchAsyncErrors";

//check if user is authenticated
export const isAuthenticated = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Request user is: ", req?.user);
    const accessToken = req.cookies.access_token as string;
    if (!accessToken || typeof accessToken !== "string") {
      return next(new ErrorHandler("Access token is invalid or missing", 400));
    }
    if (!accessToken) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN!
    ) as JwtPayload;

    if (!decodedAccessToken) {
      return next(new ErrorHandler("Invalid access token", 400));
    }

    const user = await redis.get(decodedAccessToken.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    req.user = JSON.parse(user);
    next();
  }
);

//validate user role
export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
