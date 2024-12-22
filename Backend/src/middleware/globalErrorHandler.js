import { config } from "../config/config.js";

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message,
    errorStack: config.errorstack === "dev" ? err.stack : "",
  });
};

export default globalErrorHandler;
