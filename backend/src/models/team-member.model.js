import mongoose from "mongoose";

// Team Member Schema
const TeamMemberSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const TeamMember = mongoose.model("TeamMember", TeamMemberSchema);

export default TeamMember;
