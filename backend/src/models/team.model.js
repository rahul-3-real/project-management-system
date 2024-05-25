import mongoose from "mongoose";

// Team Schema
const TeamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);

export default Team;
