import "dotenv/config";

import connectDB from "./configs/database.config.js";
import connectServer from "./configs/server.config.js";

// Connection
connectDB()
  .then(() => {
    connectServer();
  })
  .catch((error) => {
    console.error(`😒 ERROR :: ${error}`);
  });
