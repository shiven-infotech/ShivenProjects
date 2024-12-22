import createHttpError from "http-errors";
import { Admin } from "../admin/adminModel.js";
import { Category } from "./categoryModel.js";

// all data get for category
const AllDataGet = async (req, res, next) => {
  try {
    const category = await Category.find();
    if (!category || category.length === 0) {
      return next(createHttpError(404, "Categories not found"));
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// Category Create
const Create = async (req, res, next) => {
  try {
    const auth = await req.user;
    const { name, image } = await req.body;
    const admin = await Admin.findOne({ _id: auth });
    if (!admin) {
      return next(createHttpError(401, "Not authorized"));
    }
    const CategoryExist = await Category.findOne({
      $or: [{ name: name }, { image: image }],
    }).select("_id");
    if (CategoryExist) {
      return next(createHttpError(400, "Category already exists"));
    }

    const category = await Category.create({
      auth: auth,
      name: name,
      image: image,
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// single category get
const SingleCategoryget = async (req, res, next) => {
  try {
    const id = await req.params.id;
    const auth = await req.user;
    const admin = await Admin.findOne({ _id: auth }).select("_id");
    if (!admin) {
      return next(createHttpError(401, "Not authorized"));
    }
    const category = await Category.findOne({ _id: id, auth: auth });
    if (!category) {
      return next(createHttpError(404, "Category not found"));
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(500, "Error single category fetching"));
  }
};

// Category Update
const Update = async (req, res, next) => {
  try {
    const auth = req.user;
    const { name, image } = await req.body;
    const id = req.params.id;
    const admin = await Admin.findOne({ _id: auth });
    if (!admin) {
      return next(createHttpError(401, "Not authorized"));
    }
    let CategoryExist = await Category.findOne({
      _id: id,
      auth: auth,
    }).select("_id");
    if (!CategoryExist) {
      return next(createHttpError(404, "Category Not Found!"));
    }
    CategoryExist = await Category.findOne({
      $or: [{ name: name }, { image: image }],
    }).select("_id");
    if (CategoryExist) {
      return next(createHttpError(403, "Category already exists!"));
    }
    const category = await Category.findByIdAndUpdate(
      { _id: id, auth: auth },
      { name: name, image: image },
      { new: true }
    );
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// Category Delete
const Delete = async (req, res, next) => {
  try {
    const auth = await req.user;
    const id = await req.params.id;
    const admin = await Admin.findOne({ _id: auth });
    if (!admin) {
      return next(createHttpError(401, "Not authorized"));
    }

    let category = await Category.findOne({ _id: id, auth: auth });
    if (!category) {
      return next(createHttpError(404, "Category Not Found!"));
    }
    category = await Category.findByIdAndDelete({ _id: id }, { new: true });
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.error(error);
    return next(500, "Internal Server Error");
  }
};

export { AllDataGet, SingleCategoryget, Create, Delete, Update };
