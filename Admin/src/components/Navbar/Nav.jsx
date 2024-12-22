import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar/Nav.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookie.get("authtoken")) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {cookie.get("authtoken") ? (
        <nav className="navbar navbar-expand-lg navbar-light ">
          <ul className="navbar-nav d-flex flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/project">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={async () => {
                  await cookie.remove("authtoken");
                  if (!cookie.get("authtoken")) {
                    navigate("/login");
                  }
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Nav;
