import mongoose from "mongoose";

// Project Schema
const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    url: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Review", "Completed", "On Hold"],
      default: "To Do",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
