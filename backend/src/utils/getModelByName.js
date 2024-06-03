import User from "../models/user.model.js";

// Get Model by name
const getModelByName = (modelName) => {
  switch (modelName) {
    case "User":
      return User;
    default:
      return null;
  }
};

export default getModelByName;
