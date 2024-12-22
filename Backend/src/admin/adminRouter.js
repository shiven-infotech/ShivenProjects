import express from "express";
import { adminLogin } from "./adminControllar.js";

const adminRoutes = express.Router();

// Routers

// adminRoutes.post("/register", adminRegister);

// lhttp://locahost:5000/api/admin/login
adminRoutes.post("/login", adminLogin);
export default adminRoutes;
