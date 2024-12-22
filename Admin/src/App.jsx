// import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Navbar/Nav";
import Body from "./components/Body/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category/Category";
import Project from "./components/Project/Project";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoriesCreate from "./components/Category/CategoriesCreate";
import CategoriesUpdate from "./components/Category/CategoriesUpdate";
import ProjectCreate from "./components/Project/ProjectCreate";
import ProjectUpdate from "./components/Project/ProjectUpdate";
function App() {
  return (
    <>
      <ToastContainer />
      <div className="d-flex ">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/login" element={<Login />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/add" element={<CategoriesCreate />} />
            <Route path="/category/update/:id" element={<CategoriesUpdate />} />
            <Route path="/project" element={<Project />} />
            <Route path="/project/add" element={<ProjectCreate />} />
            <Route path="/project/update/:id" element={<ProjectUpdate />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
