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
      ref: Role,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Department,
      required: true,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Status,
      required: true,
    },
    date_joined: {
      type: Date,
      default: Date.now,
    },
    last_login: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
