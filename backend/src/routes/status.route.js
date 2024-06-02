import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createStatusController,
  deleteStatusController,
  getStatusDetailController,
  getStatusListController,
  updateStatusController,
} from "../controllers/status.controller.js";

// Router
const router = new Router();

// Routes
router.route("/").get(isAuthenticated, getStatusListController);
router.route("/").post(isAuthenticated, isAdmin, createStatusController);
router.route("/:id").get(isAuthenticated, getStatusDetailController);
router.route("/:id").patch(isAuthenticated, isAdmin, updateStatusController);
router.route("/:id").delete(isAuthenticated, isAdmin, deleteStatusController);

export default router;
