import { useState } from "react";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { CategoryCreate } from "../../redux/reducer";
export default function CategoriesCreate() {
  const [category, setCategory] = useState({});
  const dispatch = useDispatch();
  const Submit = (e) => {
    e.preventDefault();
    dispatch(CategoryCreate(category));
  };
  const Change = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
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
                    <label htmlFor="">Image</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="image"
                      name="image"
                      onChange={async (e) => {
                        const file = await e.target.files[0];
                        const base64 = await convertToBase64(file);
                        await setCategory({ ...category, image: base64 });
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
