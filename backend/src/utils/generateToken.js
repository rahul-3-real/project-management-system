import User from "../models/user.model.js";
import ApiError from "./apiError.js";

// Options
export const options = {
  httpOnly: true,
  secure: true,
};

// Generate Access and Refresh tokens
export const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating token :: ${error}`
    );
  }
};
