import { Router } from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  refreshAccessTokenController,
  registerController,
} from "../controllers/user.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

// Router
const router = new Router();

// Routes
router.route("/register").post(isAuthenticated, isAdmin, registerController);
router.route("/login").post(loginController);
router.route("/logout").post(isAuthenticated, logoutController);

router.route("/profile").get(isAuthenticated, getUserProfileController);
router.route("/refresh-access-token").post(refreshAccessTokenController);

export default router;
