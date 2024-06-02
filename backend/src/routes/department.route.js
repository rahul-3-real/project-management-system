import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createDepartmentController,
  deleteDepartmentController,
  getDepartmentDetailController,
  getDepartmentListController,
  updateDepartmentController,
} from "../controllers/department.controller.js";

// Router
const router = new Router();

// Routes
router.route("/").get(isAuthenticated, getDepartmentListController);
router.route("/").post(isAuthenticated, isAdmin, createDepartmentController);
router.route("/:id").get(isAuthenticated, getDepartmentDetailController);
router
  .route("/:id")
  .patch(isAuthenticated, isAdmin, updateDepartmentController);
router
  .route("/:id")
  .delete(isAuthenticated, isAdmin, deleteDepartmentController);

export default router;
