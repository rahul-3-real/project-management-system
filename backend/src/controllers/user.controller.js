import jwt from "jsonwebtoken";

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
import { sendWelcomeEmail } from "../configs/email.config.js";

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
  minLengthValidation(password, 5, "Password");
  compareFieldValidation(password, password2, "Passwords do not match");

  // * Check if the user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
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
  if (!user) throw new ApiError(400, "Error creating user");

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

// Create User Controller
export const createUserController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from request
   * TODO: validate data
   * TODO: Check if user exists
   * TODO: Create new user
   * TODO: Check if user is created
   * TODO: Send Email
   * TODO: Sending Response
   * **/

  // * Get data from request
  const { email, phone, role, department, status } = req.body;

  // * validate data
  notEmptyValidation([email, phone, role, department, status]);
  emailValidation(email);
  phoneValidation(phone);

  // * Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  // * Create new user
  const createdUser = await User.create({
    email,
    phone,
    role,
    department,
    status,
    password: process.env.DEFAULT_USER_PASSWORD,
  });

  // * Check if user is created successfully
  const user = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );
  if (!user) throw new ApiError(400, "Error creating user");

  // * Sending Email
  sendWelcomeEmail(user.email);

  // * Sending Response
  return res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully!"));
});

// Login Controller
export const loginController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: Check if user exists
   * TODO: Check if password is correct
   * TODO: Generate token
   * TODO: Sending Response
   * **/

  // * Get data from frontend
  const { email, password } = req.body;

  // * Validate data
  notEmptyValidation([email, password]);
  emailValidation(email);
  minLengthValidation(password, 5, "Password");

  // * Check if user exists
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "User with this email does not exist");

  // * Check if password is correct
  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) throw new ApiError(400, "Invalid credentials");

  // * Generate Access and Refresh Token
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // * Sending Response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully!"
      )
    );
});

// Logout Controller
export const logoutController = asyncHandler(async (req, res) => {
  /**
   * TODO: Update token in backend
   * TODO: Delete cookie from frontend
   * TODO: Sending Response
   * **/

  // * Update token in backend
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  // * Sending Response & Delete cookie from frontend
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out!"));
});

// Refresh Access Token Controller
export const refreshAccessTokenController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Refresh token from cookie
   * TODO: Decode Refresh Token
   * TODO: Check if user exists
   * TODO: Compare cookie refresh token with refresh token stored in database
   * TODO: Generate new access token
   * TODO: Sending Response
   * **/

  // * Get refresh token from cookie
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(403, "Unauthorized request");

  try {
    // * Decode refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // * Check if user exists
    const user = await User.findById(decodedToken?._id);
    if (!user) throw new ApiError(400, "Invalid refresh token");

    // * Compare cookie refresh token with refresh token stored in database
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired!");
    }

    // * Generate new access token
    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user._id
    );

    // * Sending Response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Access token refreshed!"
        )
      );
  } catch (error) {
    throw new ApiError(400, error.message || "Invalid refresh token");
  }
});

// Get User Profile Controller
export const getUserProfileController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get user from request
   * TODO: Sending Response
   * **/

  // * Get User from request
  const reqUser = await req.user;
  const user = await User.findById(reqUser._id).select(
    "-password -refreshToken"
  );

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully!"));
});

// Rest Password Controller
export const resetPasswordController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from request
   * TODO: Validate data
   * TODO: Check if new password is not same as old password
   * TODO: Update password
   * TODO: Sending Response
   * **/

  // * Get data from request
  const { oldPassword, newPassword, newPassword2 } = req.body;

  // * Validate data
  notEmptyValidation([oldPassword, newPassword, newPassword2]);
  minLengthValidation(newPassword, 5, "Password");
  compareFieldValidation(newPassword, newPassword2, "Passwords do not match");

  // * Validate old password
  const user = await User.findById(req.user._id);
  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) throw new ApiError(400, "Old passwoord is incorrect");

  // * Check if new password is not same as old password
  if (oldPassword === newPassword) {
    throw new ApiError(400, "New password cannot be same as old password");
  }

  // * Update password
  user.password = newPassword;
  const updatedUser = await user.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Password updated successfully!"));
});
