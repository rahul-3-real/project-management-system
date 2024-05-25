import mongoose from "mongoose";

// Role Schema
const RoleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", RoleSchema);

export default Role;
