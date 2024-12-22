import { config as conf } from "dotenv";

conf();

const _config = {
  // eslint-disable-next-line no-undef
  port: process.env.PORT,
  // eslint-disable-next-line no-undef
  databaseurl: process.env.MONGO_CONNECT_STRING,
  // eslint-disable-next-line no-undef
  jwtsecret: process.env.JWT_SECRET,
  // eslint-disable-next-line no-undef
  adminurl: process.env.ADMIN_URL,
  // eslint-disable-next-line no-undef
  userurl: process.env.FRONTEND_URL,
  // eslint-disable-next-line no-undef
  errorstack: process.env.ERROR_STACK,
};

export const config = Object.freeze(_config);
