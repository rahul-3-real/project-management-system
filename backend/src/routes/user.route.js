import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshAccessTokenController,
  registerController,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

// Router
const router = new Router();

// Routes
router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").post(isAuthenticated, logoutController);

router.route("/refresh-access-token").post(refreshAccessTokenController);

export default router;
