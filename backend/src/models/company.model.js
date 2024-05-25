import mongoose from "mongoose";

// Company Schema
const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    industry: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    phone_alt: {
      type: String,
    },
    email: {
      type: String,
    },
    email_alt: {
      type: String,
    },
    website: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);

export default Company;
