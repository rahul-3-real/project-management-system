import mongoose from "mongoose";

// Department Schema
const DepartmentSchema = new mongoose.Schema(
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

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
