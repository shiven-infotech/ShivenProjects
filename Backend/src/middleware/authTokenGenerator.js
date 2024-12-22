import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { config } from "../config/config.js";
const AuthTokenGenerator = async (auth) => {
  try {
    if (auth == null || auth == undefined) {
      throw new Error(createHttpError(400, "Invalid auth token"));
    }
    const token = await jwt.sign({ user: auth }, config.jwtsecret, {
      expiresIn: "30d",
      algorithm: "HS256",
    });
    return token;
  } catch (error) {
    console.error(error.message);
    throw new Error(createHttpError(401, "auth token not generated!"));
  }
};

export default AuthTokenGenerator;
