import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const initialState = {
  value: [],
};
export const allCategoriesGet = createAsyncThunk("/all/category", async () => {
  const response = await axios
    .get(`${import.meta.env.VITE_APP_HTTP_URL}/api/category`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.response.data);
      return error.response.data;
    });

  return response;
});
export const CategoryWiseProjectGets = createAsyncThunk(
  "/category/project/get",
  async (name) => {
    const response = await axios
      .get(`${import.meta.env.VITE_APP_HTTP_URL}/api/project/${name}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error.response.data);
        return error.response.data;
      });

    return response;
  }
);

export const shivenProject = createSlice({
  name: "shiven",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allCategoriesGet.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(allCategoriesGet.fulfilled, (state, payload) => {
      state.pending = false;
      state.category = payload.payload;
    });
    builder.addCase(allCategoriesGet.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
    builder.addCase(CategoryWiseProjectGets.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(CategoryWiseProjectGets.fulfilled, (state, payload) => {
      state.pending = false;
      state.projects = payload.payload;
    });
    builder.addCase(CategoryWiseProjectGets.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
  },
});

export default shivenProject.reducer;
