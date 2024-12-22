import express from "express";
import {
  AllDataGet,
  Create,
  Delete,
  SingleCategoryget,
  Update,
} from "./categoryControllar.js";
import AuthTokenExist from "../middleware/authTokenExist.js";

const categoryRouter = express.Router();

// Category routes

// AllDataGet ----- http://localhost:5000/api/category
categoryRouter.get("/", AllDataGet);
// SingleDataGet ----- http://localhost:5000/api/category/:id
categoryRouter.get("/:id", AuthTokenExist, SingleCategoryget);
// Create ----- http://localhost:5000/api/category/create
categoryRouter.post("/create", AuthTokenExist, Create);
// Update ----- http://localhost:5000/api/category/update/:id
categoryRouter.patch("/update/:id", AuthTokenExist, Update);
// Delete ----- http://localhost:5000/api/category/delete/:id
categoryRouter.delete("/delete/:id", AuthTokenExist, Delete);

export default categoryRouter;
