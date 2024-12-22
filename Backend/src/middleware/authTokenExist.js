import JWT from "jsonwebtoken";
import createHttpError from "http-errors";
import { config } from "../config/config.js";
const AuthTokenExist = async (req, res, next) => {
  const token = await req.header("authtoken");
  if (!token) {
    return next(createHttpError(401, "No token, authorization denied"));
  }
  try {
    const decoded = await JWT.verify(token, config.jwtsecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    return next(createHttpError(400, "Invalid token, authorization denied"));
  }
};

export default AuthTokenExist;
