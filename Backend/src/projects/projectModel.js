import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    auth: { type: Schema.Types.ObjectId, ref: "admin" },
    category: { type: String, required: true, ref: "category" },
    name: {
      type: String,
      index: { unique: true, dropDups: true },
      required: true,
    },
    tech: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    image: {
      type: String,
      index: { unique: true, dropDups: true },
      required: true,
    },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export const Project = model("project", projectSchema);
