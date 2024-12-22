import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CategoryWiseProjectGets } from "../redux/reducer";
const Project = () => {
  const { name } = useParams();
  const { pending, projects } = useSelector((state) => state.shiven);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CategoryWiseProjectGets(name));
  }, [name]);
  return (
    <>
      {pending === false ? (
        <div className="project">
          <div className="back">
            <Link to="/">🏃🏻‍♂️Back</Link>
          </div>

          <>
            {projects && projects.success === true ? (
              <div className="box">
                {projects &&
                  projects.project.map((e) => {
                    const id = e._id;
                    return (
                      <div key={id} className="pinfo">
                        <img src={e.image} alt="" />
                        <h2>Project : {e.name}</h2> <br />
                        <div className="tech">
                          <h3>Tech Stack : {e.tech}</h3>
                        </div>{" "}
                        <br />
                        <p>{e.description}</p>
                        <br />
                        <a href={e.url}>Visit</a>
                        <br /> <br />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <h1 style={{ textAlign: "center" }}>Projects Not Found!</h1>
            )}
          </>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Project;
