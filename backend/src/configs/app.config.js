import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "../routes/user.route.js";
import roleRoutes from "../routes/role.route.js";
import departmentRoutes from "../routes/department.route.js";
import statusRoutes from "../routes/status.route.js";

// App Configuration
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// Setup Template Engine
app.set("view engine", "ejs");
app.set("views", "./src/templates");

// Routes
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/status", statusRoutes);

// ! Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode =
    err.status &&
    Number.isInteger(err.status) &&
    err.status >= 100 &&
    err.status < 600
      ? err.status
      : 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
});

// ! Debugging Invalid Status Codes
app.use((err, req, res, next) => {
  console.error("Error:", err);
  if (
    err.status &&
    (!Number.isInteger(err.status) || err.status < 100 || err.status >= 600)
  ) {
    console.error("Invalid status code:", err.status);
    err.status = 500;
  }
  res
    .status(err.status)
    .json({ error: err.message || "Internal Server Error" });
});

// Test Route
app.get("/api", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

export default app;
