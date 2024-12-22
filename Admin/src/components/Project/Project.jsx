import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import {
  allProjectsGet,
  ProjectsDelete,
  ProjectsUpdateGet,
} from "../../redux/reducer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Project = () => {
  const { pending, project, projectd } = useSelector((state) => state.shiven);
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(allProjectsGet());
  }, []);
  useEffect(() => {
    dispacth(allProjectsGet());
  }, [projectd]);
  return (
    <div className="w-100 course-wrapper">
      <Header />
      {pending === false ? (
        <div className="shadow mx-5 px-3 bg-light rounded-3 ">
          <div className=" d-flex align-items-center justify-content-between p-3 mt-3 ">
            <h4 className="mb-0">Projects</h4>
            <Link to="/project/add">
              <button className="btn">Add New</button>
            </Link>
          </div>

          <div className=" ">
            <table className="table ">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Technologies</th>
                  <th>Description</th>
                  <th>Url</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              {project && project.success === true && (
                <tbody>
                  {project.project.map((e) => {
                    const id = e._id;
                    return (
                      <tr key={id}>
                        <td>{e.name}</td>
                        <td>{e.category}</td>
                        <td>
                          <img src={e.image} alt="" width={100} height={100} />
                        </td>
                        <td>{e.tech}</td>
                        <td>{e.description}</td>
                        <td>{e.url}</td>
                        <td>{e.updatedAt.slice(0, 10)}</td>
                        <td>
                          <Link
                            to={`/project/update/${e._id}`}
                            style={{ color: "green", textDecoration: "none" }}
                            // onClick={async () => {
                            //   await dispacth(ProjectsUpdateGet(id));
                            // }}
                          >
                            Update
                          </Link>
                          <br />
                          <Link
                            style={{ color: "red", textDecoration: "none" }}
                            onClick={async (e) => {
                              e.preventDefault();
                              await dispacth(ProjectsDelete(id));
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
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Project;
