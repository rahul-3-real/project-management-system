import Department from "../models/department.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { notEmptyValidation } from "../utils/validators.js";

// Create Department Controller
export const createDepartmentController = asyncHandler(async (req, res) => {
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
  const existingDepartment = await Department.findOne({ title });
  if (existingDepartment) {
    throw new ApiError(400, "Department already exists");
  }

  // * Create Department
  const department = await Department.create({ title, description });

  // * Sending Response
  return res
    .status(201)
    .json(new ApiResponse(201, department, "Department created!"));
});

// Get Department List Controller
export const getDepartmentListController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get All department from database
   * TODO: Sending Response
   * **/

  // * Get All department from database
  const departments = await Department.find();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, departments, "Departments fetched!"));
});

// Get Department Detail Controller
export const getDepartmentDetailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get department from request
   * TODO: Check if department exists
   * TODO: Sending Response
   * **/

  // * Get department from request
  const department = await Department.findById(req.params.id);

  // * Check if department exists
  if (!department) throw new ApiError(404, "Department not found");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, department, "Department fetched!"));
});

// Update Department Controller
export const updateDepartmentController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get the department from request
   * TODO: Get data from request
   * TODO: Validate data
   * TODO: Check if the department exists
   * TODO: Update the department
   * TODO: Sending Response
   * **/

  // * Get department from request
  const department = await Department.findById(req.params.id);

  // * Check if department exists
  if (!department) throw new ApiError(404, "Department not found");

  // * Get data from request
  const { title, description } = req.body;

  // * Validate data
  notEmptyValidation([title, description]);

  // * Check if department exists
  if (title !== department.title) {
    const existingDepartment = await Department.findOne({ title });
    if (existingDepartment) {
      throw new ApiError(400, "Department with this title already exists");
    }
  }

  // * Update the department
  department.title = title;
  department.description = description;
  await department.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, department, "Department updated successfully!"));
});

// Delete Department Controller
export const deleteDepartmentController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get the department from request
   * TODO: Check if the department exists
   * TODO: Delete the department
   * TODO: Sending Response
   * **/

  // * Get the department from request
  const department = await Department.findByIdAndDelete(req.params.id);

  // * Check if the department exists
  if (!department) throw new ApiError(404, "Department not found");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Department deleted successfully!"));
});
