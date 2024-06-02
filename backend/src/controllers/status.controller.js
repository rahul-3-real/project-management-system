import Status from "../models/status.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { notEmptyValidation } from "../utils/validators.js";

// Create Status Controller
export const createStatusController = asyncHandler(async (req, res) => {
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
  const existingStatus = await Status.findOne({ title });
  if (existingStatus) {
    throw new ApiError(400, "Status already exists");
  }

  // * Create Status
  const status = await Status.create({ title, description });

  // * Sending Response
  return res.status(201).json(new ApiResponse(201, status, "Status created!"));
});

// Get Status List Controller
export const getStatusListController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get All status from database
   * TODO: Sending Response
   * **/

  // * Get All status from database
  const status = await Status.find();

  // * Sending Response
  return res.status(200).json(new ApiResponse(200, status, "Status fetched!"));
});

// Get Status Detail Controller
export const getStatusDetailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get status from request
   * TODO: Check if status exists
   * TODO: Sending Response
   * **/

  // * Get status from request
  const status = await Status.findById(req.params.id);

  // * Check if status exists
  if (!status) throw new ApiError(404, "Status not found");

  // * Sending Response
  return res.status(200).json(new ApiResponse(200, status, "Status fetched!"));
});

// Update Status Controller
export const updateStatusController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get the status from request
   * TODO: Get data from request
   * TODO: Validate data
   * TODO: Check if the status exists
   * TODO: Update the status
   * TODO: Sending Response
   * **/

  // * Get status from request
  const status = await Status.findById(req.params.id);

  // * Check if status exists
  if (!status) throw new ApiError(404, "Status not found");

  // * Get data from request
  const { title, description } = req.body;

  // * Validate data
  notEmptyValidation([title, description]);

  // * Check if status exists
  if (title !== status.title) {
    const existingStatus = await Status.findOne({ title });
    if (existingStatus) {
      throw new ApiError(400, "Status with this title already exists");
    }
  }

  // * Update the status
  status.title = title;
  status.description = description;
  await status.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, status, "Status updated successfully!"));
});

// Delete Status Controller
export const deleteStatusController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get the status from request
   * TODO: Check if the status exists
   * TODO: Delete the status
   * TODO: Sending Response
   * **/

  // * Get the status from request
  const status = await Status.findByIdAndDelete(req.params.id);

  // * Check if the status exists
  if (!status) throw new ApiError(404, "Status not found");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Status deleted successfully!"));
});
