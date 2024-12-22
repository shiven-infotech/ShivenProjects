import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import "./Style/App.css";
import Category from "./Components/Category";
import Project from "./Components/Project";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/projects/:name" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
