import express, { Request, Response, Router } from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
} from "../controllers/user.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const router: Router = express.Router();

router.post("/register", registerUser);

router.post("/activate-user", activateUser);

router.post("/login", loginUser);

router.get("/logout", isAuthenticated, logoutUser);

router.get("/refresh", updateAccessToken);

router.get("/me", isAuthenticated, getUserInfo);

router.post("/social-auth", socialAuth);

router.put("/update-user", isAuthenticated, updateUserInfo);

router.put("/update-password", isAuthenticated, updatePassword);

router.put("/update-avatar", isAuthenticated, updateProfilePicture);

router.get("/mee", (req: Request, res: Response) => {
  console.log("user is: ", req.user);
  console.log(req.cookies);
  console.log("hello");
});

export default router;
