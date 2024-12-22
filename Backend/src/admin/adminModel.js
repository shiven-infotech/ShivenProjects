import { Schema, model } from "mongoose";

const adminRegister = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const Admin = model("admin", adminRegister);
