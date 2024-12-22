import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { allCategoriesGet, CategoryDelete } from "../../redux/reducer";
import Header from "../Header/Header";
import "../Category/Category.css";

const Category = () => {
  const { pending, category, categoryd } = useSelector((state) => state.shiven);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategoriesGet());
  }, []);
  useEffect(() => {
    dispatch(allCategoriesGet());
  }, [categoryd]);
  return (
    <>
      {pending === false ? (
        <div className="w-100 course-wrapper">
          <Header />
          <div className="shadow mx-5 px-3 bg-light rounded-3 ">
            <div className=" d-flex align-items-center justify-content-between p-3 mt-3 ">
              <h4 className="mb-0">Categories</h4>
              <Link to="/category/add">
                <button className="btn ">Add New</button>
              </Link>
            </div>

            <div className=" ">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Image</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {category && category.success === true && (
                  <tbody>
                    {category.category.map((e) => {
                      const id = e._id;
                      return (
                        <tr key={id}>
                          <td>{e.name}</td>
                          <td>
                            <img
                              src={e.image}
                              alt=""
                              width={100}
                              height={100}
                            />
                          </td>
                          <td>{e.updatedAt.slice(0, 10)}</td>
                          <td>
                            <Link
                              to={`/category/update/${e._id}`}
                              style={{ color: "green", textDecoration: "none" }}
                            >
                              Update
                            </Link>
                            <br />
                            <Link
                              style={{ color: "red", textDecoration: "none" }}
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(CategoryDelete(id));
                              }}
                            >
                              Delete
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Category;
