import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email_alt: {
      type: String,
    },
    phone_alt: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
    },
    date_joined: {
      type: Date,
      default: Date.now,
    },
    last_login: {
      type: Date,
      default: Date.now,
    },
    refreshToken: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// * Encrypting Password Hook
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// * Generating Access Token Method
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

// * Generating Refresh Token Method
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

// * Compare Password Method
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
