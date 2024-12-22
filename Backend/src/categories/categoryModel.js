import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    auth: { type: Schema.Types.ObjectId, ref: "admin" },
    name: {
      type: String,
      index: { unique: true, dropDups: true },
      required: true,
    },
    image: {
      type: String,
      index: { unique: true, dropDups: true },
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = model("category", categorySchema);
