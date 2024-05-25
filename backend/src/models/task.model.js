import mongoose from "mongoose";

// Task Schema
const TaskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    due_date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Review", "Completed", "On Hold"],
      default: "To Do",
    },
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sub_task: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model("Teak", TaskSchema);

export default Task;
