import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import adminRoutes from "./admin/adminRouter.js";
import categoryRouter from "./categories/categoryRouter.js";
import projectRouter from "./projects/projectRouter.js";
import { config } from "./config/config.js";
const app = express();
app.use(
  cors({
    origin: [config.adminurl, config.userurl],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
// Router
app.get("/", (req, res) => {
  res.send("Welcome to Shiven Projects");
});

// admin project routes
app.use("/api/admin", adminRoutes);

// category routes
app.use("/api/category", categoryRouter);

// project routes
app.use("/api/project", projectRouter);

// Global error handler middleware
app.use(globalErrorHandler);

export default app;
