import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allCategoriesGet } from "../redux/reducer";

const Category = () => {
  const { pending, category } = useSelector((state) => state.shiven);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategoriesGet());
  }, []);
  return (
    <>
      {pending === false ? (
        <div className="container">
          {category && category.success === true && (
            <div className="box">
              {category.category.map((e) => {
                const id = e._id;
                return (
                  <Link key={id} to={`/projects/${e.name}`}>
                    <div className="categories">
                      <img src={e.image} alt={e.name} />
                      <h1>{e.name}</h1>
                    </div>
                  </Link>
                );
              })}
              {/* <Link to="/projects">
          <div className="categories">
            <img src={Image1} alt="Modiji" />
            <h1>E-Commerce</h1>
          </div>
        </Link>
        <Link  to="/projects">
          <div className="categories">
            <img src={Image1} alt="Modiji" />
            <h1>E-Commerce</h1>
          </div>
        </Link>
        <Link  to="/projects">
          <div className="categories">
            <img src={Image1} alt="Modiji" />
            <h1>E-Commerce</h1>
          </div>
        </Link>
        <Link  to="/projects">
          <div className="categories">
            <img src={Image1} alt="Modiji" />
            <h1>E-Commerce</h1>
          </div>
        </Link> */}
            </div>
          )}
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Category;
