import createHttpError from "http-errors";
import { Admin } from "../admin/adminModel.js";
import { Category } from "../categories/categoryModel.js";
import { Project } from "./projectModel.js";

// all projects get
const AllDataGet = async (req, res, next) => {
  try {
    const auth = await req.user;
    const admin = await Admin.findOne({ _id: auth }).select("_id");
    if (!admin) {
      return next(createHttpError(401, "Not authorized"));
    }
    const project = await Project.find({ auth: auth });
    if (!project || project.length == 0) {
      return next(createHttpError(404, "Projects Not Found!"));
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// projects gets
const CategoryWiseProjectGets = async (req, res, next) => {
  try {
    const name = req.params.name;
    const category = await Category.findOne({ name: name }).select("_id");
    if (!category) {
      return next(createHttpError(404, "Categories Not Found"));
    }
    const project = await Project.find({ category: name });
    if (!project || project.length === 0) {
      return next(createHttpError(404, "Projects Not Found!"));
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// project create
const Create = async (req, res, next) => {
  try {
    const { name, tech, category, description, image, url } = await req.body;
    const auth = await req.user;
    const admin = await Admin.findOne({ _id: auth }).select("_id");
    if (!admin) {
      return next(createHttpError(401, "Not authorized"));
    }

    const projectExist = await Project.findOne({
      $or: [{ name: name }, { image: image }],
    }).select("_id");

    if (projectExist) {
      return next(createHttpError(403, "Project already exists!"));
    }

    const project = await Project.create({
      auth: admin._id,
      name: name,
      tech: tech,
      category: category,
      description: description,
      image: image,
      url: url,
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    console.log(error.message);
    return next(500, "Internal Server Error");
  }
};

// single project get
const SingleProjectget = async (req, res, next) => {
  try {
    const id = await req.params.id;
    const auth = await req.user;
    const admin = await Admin.findOne({ _id: auth }).select("_id");
    if (!admin) {
      return next(createHttpError(401, "Not authorized"));
    }
    const project = await Project.findOne({ _id: id, auth: auth });
    if (!project) {
      return next(createHttpError(404, "Project not found"));
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(500, "Error Single Project Fetching"));
  }
};
// project update
const Update = async (req, res, next) => {
  try {
    const { name, tech, category, description, image, url } = await req.body;
    const auth = await req.user;
    const id = await req.params.id;
    const admin = await Admin.findOne({ _id: auth }).select("_id");
    if (!admin) {
      return next(createHttpError(401, "Not authorized"));
    }
    let projectExist = await Project.findOne({ _id: id, auth: auth }).select(
      "_id"
    );
    if (!projectExist) {
      return next(createHttpError(401, "Project not found!"));
    }
    projectExist = await Project.findOne({
      $or: [{ name: name }, { image: image }],
    }).select("_id");
    if (projectExist) {
      return next(createHttpError(403, "Project already exists!"));
    }
    const project = await Project.findByIdAndUpdate(
      { _id: id, auth: auth },
      { name, tech, category, description, image, url },
      { new: true }
    );
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// project delete
const Delete = async (req, res, next) => {
  try {
    const id = await req.params.id;
    const auth = await req.user;
    const admin = await Admin.findOne({ _id: auth }).select("_id");
    if (!admin) {
      return next(createHttpError(401, "Not authorized"));
    }
    let project = await Project.findOne({ _id: id, auth: auth });
    if (!project) {
      return next(createHttpError(401, "Project not found!"));
    }
    project = await Project.findOneAndDelete(
      { _id: id, auth: auth },
      { new: true }
    ).select("_id");
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

export {
  AllDataGet,
  SingleProjectget,
  CategoryWiseProjectGets,
  Create,
  Update,
  Delete,
};
