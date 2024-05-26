import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import {
  emailValidation,
  phoneValidation,
  notEmptyValidation,
  minLengthValidation,
  compareFieldValidation,
} from "../utils/validators.js";
import { options, generateAccessRefreshToken } from "../utils/generateToken.js";

// Register Controller
export const registerController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: Check if the user exists
   * TODO: Create a new User
   * TODO: Check if the user is created
   * TODO: Generate Access & Refresh Token
   * TODO: Send Response to user
   * **/

  // * Get data from frontend
  const { email, phone, password, password2 } = req.body;

  // * Validate data
  notEmptyValidation([email, phone, password, password2]);
  emailValidation(email);
  phoneValidation(phone);
  minLengthValidation(password, 6, "Password");
  compareFieldValidation(password, password2, "Passwords do not match");

  // * Check if the user exists
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });
  if (existingUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User already exists"));
  }

  // * Create a new User
  const createdUser = await User.create({
    email,
    phone,
    password,
  });

  // * Check if the user is created
  const user = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Error creating user"));
  }

  // * Generate Access and Refresh Token
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  // * Sending Response
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(201, user, "User created successfully!"));
});
