// import React, { useEffect } from "react";
import Header from "../Header/Header";
import "../Body/Body.css";
import Cookies from "universal-cookie";

const Body = () => {
  const cookie = new Cookies();
  return (
    <>
      {cookie.get("authtoken") ? (
        <div className="w-100 course-wrapper">
          <Header />
          <h4 className="mx-3 d-block">Welcome Admin</h4>
          <div className="d-flex justify-content-around">
            <div>
              <h1>Projects</h1>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Body;
