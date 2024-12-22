import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { allCategoriesGet, ProjectsUpdate, ProjectsUpdateGet } from '../../redux/reducer';
import Header from '../Header/Header';

const ProjectUpdate = () => {
  const [project, setProject] = useState({});
  const {id} = useParams();
  const dispatch = useDispatch();
  const { pending, category, projectg } = useSelector((state) => state.shiven);
  const Submit = (e) => {
    e.preventDefault();
    dispatch(ProjectsUpdate({project,id}));
  };
  const Change = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
     dispatch(ProjectsUpdateGet(id));
     dispatch(allCategoriesGet());
  },[]);
  useEffect(()=>{
    if (pending=== false && projectg && projectg.success === true) {
      setProject({  
        name:projectg.project.name,
        image:projectg.project.image,
        url:projectg.project.url,
        category:projectg.project.category,
        description:projectg.project.description,
        tech:projectg.project.tech,
      })
     }
  },[projectg]);

  return (
    <div className="w-100 course-wrapper">
      <Header />
      {pending === false ?<div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1>Project Update</h1>
                {projectg && projectg.success===true && <form action="/" method="post" onSubmit={Submit}>
                  <div className="form-group">
                    <label htmlFor="" >Name</label>
                    <input
                      type="text"
                      value={project.name}
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
                      value={project.tech}
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
                      value={project.url}
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
                      value={project.description}
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
                          value={project.category}
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
                  <label htmlFor="image" style={{ cursor: "pointer" }}>
                          <img
                            src={project.image}
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
                            await setProject({ ...project, image: base64 });
                          }}
                        />
                  </div>
                  <button type="submit" className="btn btn-primary my-3">
                    Add
                  </button>
                </form>}
              </div>
            </div>
          </div>
        </div>
      </div>:"Loading..."}
    </div>
  )
}

export default ProjectUpdate;

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
