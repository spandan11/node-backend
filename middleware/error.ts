import { Request, Response, NextFunction } from "express";
import Errorhandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new Errorhandler(message, 404);
  }

  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new Errorhandler(message, 400);
  }

  //Wrong jwt error
  if (err.code === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new Errorhandler(message, 400);
  }

  //JWt expired error
  if (err.code === "TokenExpiredError") {
    const message = `Json web token has expired, try again`;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
