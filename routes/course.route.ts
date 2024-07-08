import express, { Router } from "express";
import { editCourse, uploadCourseData } from "../controllers/course.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const router: Router = express.Router();

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourseData
);

router.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRole("admin"),
  editCourse
);

export default router;
