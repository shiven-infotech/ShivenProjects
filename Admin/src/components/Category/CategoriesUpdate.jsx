import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import { CategoryUpdate, CategoryUpdateGet } from "../../redux/reducer";
import { useParams } from "react-router-dom";
export default function CategoriesUpdate() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const dispatch = useDispatch();
  const { pending, categoryg, categorye } = useSelector(
    (state) => state.shiven
  );
  const Submit = (e) => {
    e.preventDefault();
    dispatch(CategoryUpdate({ category, id }));
  };
  const Change = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(CategoryUpdateGet(id));
  }, []);
  useEffect(() => {
    dispatch(CategoryUpdateGet(id));
  }, [categorye]);
  useEffect(() => {
    if (pending === false && categoryg && categoryg.success === true) {
      setCategory({
        name: categoryg.category.name,
        image: categoryg.category.image,
      });
    }
  }, [pending === false]);
  return (
    <div className="w-100 course-wrapper">
      <Header />
      {pending === false ? (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h1>Category Add</h1>
                  {categoryg && categoryg.success === true && (
                    <form action="/" method="patch" onSubmit={Submit}>
                      <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={category.name}
                          onChange={Change}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="image" style={{ cursor: "pointer" }}>
                          <img
                            src={category.image}
                            width={100}
                            height={70}
                            alt="test"
                            style={{ display: "block", marginTop: "10px" }}
                          />
                        </label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="image"
                          name="image"
                          style={{ display: "none" }}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
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
