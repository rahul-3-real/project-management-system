import jwt from "jsonwebtoken";

import Role from "../models/role.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { notEmptyValidation } from "../utils/validators.js";

// Create Role Controller
export const createRoleController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from request
   * TODO: Validate data
   * TODO: Check if exist and create
   * TODO: Sending Response
   * **/

  // * Get data from request
  const { title, description } = req.body;

  // * Validate data
  notEmptyValidation([title, description]);

  // * Check if the data exist
  const existingRole = await Role.findOne({ title });
  if (existingRole) {
    throw new ApiError(400, "Role already exists");
  }

  // * Create Role
  const role = await Role.create({ title, description });

  // * Sending Response
  return res.status(201).json(new ApiResponse(201, role, "Role created!"));
});

// Get Roles List Controller
export const getRolesListController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get All roles from database
   * TODO: Sending Response
   * **/

  // * Get All roles from database
  const roles = await Role.find();

  // * Sending Response
  return res.status(200).json(new ApiResponse(200, roles, "Roles fetched!"));
});

// Get Role Detail Controller
export const getRoleDetailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get role from request
   * TODO: Check if role exists
   * TODO: Sending Response
   * **/

  // * Get role from request
  const role = await Role.findById(req.params.id);

  // * Check if role exists
  if (!role) throw new ApiError(404, "Role not found");

  // * Sending Response
  return res.status(200).json(new ApiResponse(200, role, "Role fetched!"));
});

// Update Role Controller
export const updateRoleController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get the role from request
   * TODO: Get data from request
   * TODO: Validate data
   * TODO: Check if the role exists
   * TODO: Update the role
   * TODO: Sending Response
   * **/

  // * Get role from request
  const role = await Role.findById(req.params.id);

  // * Check if role exists
  if (!role) throw new ApiError(404, "Role not found");

  // * Get data from request
  const { title, description } = req.body;

  // * Validate data
  notEmptyValidation([title, description]);

  // * Check if role exists
  if (title !== role.title) {
    const existingRole = await Role.findOne({ title });
    if (existingRole) {
      throw new ApiError(400, "Role with this title already exists");
    }
  }

  // * Update the role
  role.title = title;
  role.description = description;
  await role.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, role, "Role updated successfully!"));
});

// Delete Role Controller
export const deleteRoleController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get the role from request
   * TODO: Check if the role exists
   * TODO: Delete the role
   * TODO: Sending Response
   * **/

  // * Get the role from request
  const role = await Role.findByIdAndDelete(req.params.id);

  // * Check if the role exists
  if (!role) throw new ApiError(404, "Role not found");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Role deleted successfully!"));
});
