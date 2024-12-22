import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allCategoriesGet, ProjectsCreate } from "../../redux/reducer";
import Header from "../Header/Header";
export default function ProjectCreate() {
  const [project, setProject] = useState({});
  const { pending, category } = useSelector((state) => state.shiven);
  const dispatch = useDispatch();
  const Submit = (e) => {
    e.preventDefault();
    dispatch(ProjectsCreate(project));
  };
  const Change = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(allCategoriesGet());
  }, []);
  return (
    <div className="w-100 course-wrapper">
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1>Category Add</h1>
                <form action="/" method="post" onSubmit={Submit}>
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={Change}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Technologies</label>
                    <input
                      type="text"
                      className="form-control"
                      id="technologies"
                      name="tech"
                      onChange={Change}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="url"
                      name="url"
                      onChange={Change}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="name"
                      name="description"
                      cols={10}
                      rows={5}
                      onChange={Change}
                    ></textarea>
                  </div>
                  {pending === false && (
                    <div className="form-group">
                      <label htmlFor="">Categories</label>
                      {category && category.success === true && (
                        <select
                          name="category"
                          id=""
                          className="form-select"
                          onChange={Change}
                        >
                          <option value="">Categories....</option>
                          {category.category.map((e) => (
                            <option key={e._id} value={e.name}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="">Image</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="image"
                      name="image"
                      onChange={async (e) => {
                        const file = await e.target.files[0];
                        const base64 = await convertToBase64(file);
                        await setProject({ ...project, image: base64 });
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary my-3">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
