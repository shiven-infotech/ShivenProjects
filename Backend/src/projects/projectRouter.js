import express from "express";
import {
  AllDataGet,
  CategoryWiseProjectGets,
  Create,
  Delete,
  SingleProjectget,
  Update,
} from "./projectControllar.js";
import AuthTokenExist from "../middleware/authTokenExist.js";

const projectRouter = express.Router();

// Routers
// all projects get --- http://localhost:5000/api/project
projectRouter.get("/", AuthTokenExist, AllDataGet);
// single project get --- http://localhost:5000/api/project/single/:id
projectRouter.get("/single/:id", AuthTokenExist, SingleProjectget);
// Project gets --- http://localhost:5000/api/project/:name
projectRouter.get("/:name", CategoryWiseProjectGets);
// Create --- http://localhost:5000/api/project/create
projectRouter.post("/create", AuthTokenExist, Create);
// Update --- http://localhost:5000/api/project/update/:id
projectRouter.patch("/update/:id", AuthTokenExist, Update);
// Delete --- http://localhost:5000/api/project/delete/:id
projectRouter.delete("/delete/:id", AuthTokenExist, Delete);

export default projectRouter;
