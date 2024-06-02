import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Verify that the user is authenticated
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(201, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

// Verify that the user is Admin
export const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const reqUser = await User.findById(req.user._id).populate("role");
    if (!reqUser) {
      throw new ApiError(401, "Invalid access token");
    }

    if (reqUser.role?.title !== "Admin") {
      throw new ApiError(401, "You are not an admin");
    }

    next();
  } catch (error) {
    next(new ApiError(401, error?.message || "Invalid access token"));
  }
});
