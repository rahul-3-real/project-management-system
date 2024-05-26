import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/user.controller.js";

// Router
const router = new Router();

// Routes
router.route("/register").post(registerController);
router.route("/login").post(loginController);

export default router;
