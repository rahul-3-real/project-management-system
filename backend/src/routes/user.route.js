import { Router } from "express";
import {
  createUserController,
  getUserProfileController,
  loginController,
  logoutController,
  refreshAccessTokenController,
  registerController,
  resetPasswordController,
} from "../controllers/user.controller.js";
import {
  isAuthenticated,
  isAdmin,
  isAuthorized,
} from "../middlewares/auth.middleware.js";

// Router
const router = new Router();

// Routes
router.route("/register").post(isAuthenticated, registerController);
router.route("/create").post(isAuthenticated, isAdmin, createUserController);

router.route("/login").post(loginController);
router.route("/logout").post(isAuthenticated, logoutController);

router.route("/profile").get(isAuthenticated, getUserProfileController);
router.route("/refresh-access-token").post(refreshAccessTokenController);

router.route("/reset-password").patch(isAuthenticated, resetPasswordController);

export default router;
