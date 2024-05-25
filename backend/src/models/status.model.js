import mongoose from "mongoose";

// Status Schema
const StatusSchema = new mongoose.Schema(
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

const Status = mongoose.model("Status", StatusSchema);

export default Status;
