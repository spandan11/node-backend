import { NextFunction, Response } from "express";
import courseModel from "../models/course.model";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";

//create course
export const createCourse = CatchAsyncErrors(
  async (data: any, res: Response, next: NextFunction) => {
    const course = await courseModel.create(data);
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  }
);
