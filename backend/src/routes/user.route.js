import { Router } from "express";
import { registerController } from "../controllers/user.controller.js";

// Router
const router = new Router();

// Routes
router.route("/register").post(registerController);

export default router;
