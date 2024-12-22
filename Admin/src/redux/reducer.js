import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import axios from "axios";

const cookie = new Cookies();

const initialState = {
  value: [],
};

export const AdminLogin = createAsyncThunk("/admin/login", async (admin) => {
  const { username, password } = admin;
  const response = await axios
    .post(`${import.meta.env.VITE_APP_HTTP_URL}/api/admin/login`, {
      username,
      password,
    })
    .then((response) => {
      cookie.set("authtoken", response.data.token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //    secure: true,
      });
      return response.data;
    })
    .catch((error) => {
      console.error(error.response.data);
      return error.response.data;
    });

  return response;
});

// all Categories get
export const allCategoriesGet = createAsyncThunk("/allCategories", async () => {
  const response = await axios
    .get(`${import.meta.env.VITE_APP_HTTP_URL}/api/category`, {
      headers: {
        authtoken: cookie.get("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.response.data);
      return error.response.data;
    });

  return response;
});
// category create
export const CategoryCreate = createAsyncThunk(
  "/Category/create",
  async (data) => {
    const { name, image } = data;
    const response = await axios
      .post(
        `${import.meta.env.VITE_APP_HTTP_URL}/api/category/create`,
        { name, image },
        {
          headers: {
            authtoken: cookie.get("authtoken"),
          },
        }
      )
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

// category delete
export const CategoryDelete = createAsyncThunk(
  "/categoory/delete",
  async (id) => {
    const response = await axios
      .delete(
        `${import.meta.env.VITE_APP_HTTP_URL}/api/category/delete/${id}`,
        {
          headers: {
            authtoken: cookie.get("authtoken"),
          },
        }
      )
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
export const CategoryUpdateGet = createAsyncThunk(
  "/categoory/update/get",
  async (id) => {
    const response = await axios
      .get(`${import.meta.env.VITE_APP_HTTP_URL}/api/category/${id}`, {
        headers: {
          authtoken: cookie.get("authtoken"),
        },
      })
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
export const CategoryUpdate = createAsyncThunk(
  "/categoory/update",
  async ({ category, id }) => {
    const { name, image } = category;
    const response = await axios
      .patch(
        `${import.meta.env.VITE_APP_HTTP_URL}/api/category/update/${id}`,
        {
          name,
          image,
        },
        {
          headers: {
            authtoken: cookie.get("authtoken"),
          },
        }
      )
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
export const allProjectsGet = createAsyncThunk("/allProjectsget", async () => {
  const response = await axios
    .get(`${import.meta.env.VITE_APP_HTTP_URL}/api/project`, {
      headers: {
        authtoken: cookie.get("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.response.data);
      return error.response.data;
    });

  return response;
});
export const ProjectsCreate = createAsyncThunk(
  "/project/create",
  async (project) => {
    const { name, category, image, tech, description, url } = project;
    const response = await axios
      .post(
        `${import.meta.env.VITE_APP_HTTP_URL}/api/project/create`,
        {
          name,
          category,
          image,
          tech,
          description,
          url,
        },
        {
          headers: {
            authtoken: cookie.get("authtoken"),
          },
        }
      )
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
export const ProjectsUpdateGet = createAsyncThunk(
  "/project/update/get",
  async (id) => {
    const response = await axios
      .get(`${import.meta.env.VITE_APP_HTTP_URL}/api/project/single/${id}`, {
        headers: {
          authtoken: cookie.get("authtoken"),
        },
      })
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
export const ProjectsUpdate = createAsyncThunk(
  "/project/update",
  async ({ project, id }) => {
    const { name, category, image, tech, description, url } = project;
    const response = await axios
      .patch(
        `${import.meta.env.VITE_APP_HTTP_URL}/api/project/update/${id}`,
        {
          name,
          category,
          image,
          tech,
          description,
          url,
        },
        {
          headers: {
            authtoken: cookie.get("authtoken"),
          },
        }
      )
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
export const ProjectsDelete = createAsyncThunk(
  "/project/delete",
  async (id) => {
    const response = await axios
      .delete(`${import.meta.env.VITE_APP_HTTP_URL}/api/project/delete/${id}`, {
        headers: {
          authtoken: cookie.get("authtoken"),
        },
      })
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
    builder.addCase(AdminLogin.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(AdminLogin.fulfilled, (state, payload) => {
      state.pending = false;
      state.admins = payload.payload;
      if (state.admins.success === false) {
        toast.warn("Pleace Valid Data Enter!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    builder.addCase(AdminLogin.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
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
    builder.addCase(CategoryCreate.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(CategoryCreate.fulfilled, (state, payload) => {
      state.pending = false;
      state.categorya = payload.payload;
      if (state.categorya.success === true) {
        toast.success("Category Successfully Created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (state.categorya.success === false) {
        toast.warn("Please Valid Data Enter or Category Already Exist!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    builder.addCase(CategoryCreate.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
    builder.addCase(CategoryDelete.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(CategoryDelete.fulfilled, (state, payload) => {
      state.pending = false;
      state.categoryd = payload.payload;
      if (state.categoryd.success === true) {
        toast.success("Category Successfully Delete!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    builder.addCase(CategoryDelete.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
    builder.addCase(CategoryUpdateGet.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(CategoryUpdateGet.fulfilled, (state, payload) => {
      state.pending = false;
      state.categoryg = payload.payload;
    });
    builder.addCase(CategoryUpdateGet.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
    builder.addCase(CategoryUpdate.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(CategoryUpdate.fulfilled, (state, payload) => {
      state.pending = false;
      state.categorye = payload.payload;
      if (state.categorye.success === true) {
        toast.success("Category Successfully Updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (state.categorye.success === false) {
        toast.warn("Category Already Exist Why are Your Same Data Put!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    builder.addCase(CategoryUpdate.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
    builder.addCase(allProjectsGet.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(allProjectsGet.fulfilled, (state, payload) => {
      state.pending = false;
      state.project = payload.payload;
    });
    builder.addCase(allProjectsGet.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
    builder.addCase(ProjectsCreate.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(ProjectsCreate.fulfilled, (state, payload) => {
      state.pending = false;
      state.projecta = payload.payload;
      if (state.projecta.success === true) {
        toast.success("Project Successfully Created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (state.projecta.success === false) {
        toast.warn(
          "Please Valid Data Enter or Project Already Exist Why are You Same Data Put!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    });
    builder.addCase(ProjectsCreate.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
    builder.addCase(ProjectsDelete.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(ProjectsDelete.fulfilled, (state, payload) => {
      state.pending = false;
      state.projectd = payload.payload;
      if (state.projectd.success === true) {
        toast.success("Project Successfully Deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    builder.addCase(ProjectsDelete.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
    builder.addCase(ProjectsUpdateGet.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(ProjectsUpdateGet.fulfilled, (state, payload) => {
      state.pending = false;
      state.projectg = payload.payload;
    });
    builder.addCase(ProjectsUpdateGet.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
    builder.addCase(ProjectsUpdate.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(ProjectsUpdate.fulfilled, (state, payload) => {
      state.pending = false;
      state.projecte = payload.payload;
      if (state.projecte.success === true) {
        toast.success("Project Successfully Updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (state.projecte.success === false) {
        toast.warn(
          "Please Valid Data Enter or Project Already Exist Why are You Same Data Put!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    });
    builder.addCase(ProjectsUpdate.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload;
    });
  },
});

export default shivenProject.reducer;
