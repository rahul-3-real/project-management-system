import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createRoleController,
  deleteRoleController,
  getRoleDetailController,
  getRolesListController,
  updateRoleController,
} from "../controllers/role.controller.js";

// Router
const router = new Router();

// Routes
router.route("/").get(isAuthenticated, getRolesListController);
router.route("/").post(isAuthenticated, isAdmin, createRoleController);
router.route("/:id").get(isAuthenticated, getRoleDetailController);
router.route("/:id").patch(isAuthenticated, isAdmin, updateRoleController);
router.route("/:id").delete(isAuthenticated, isAdmin, deleteRoleController);

export default router;
