import "../Header/Header.css";
import Cookies from "universal-cookie";
const Header = () => {
  const cookie = new Cookies();
  return (
    <>
      {cookie.get("authtoken") ? (
        <div className="container-fluid bg-light">
          <div className="row py-3 d-flex align-items-center mb-3 shadow">
            <div className="col-6 d-flex">
              <h1>Shiven Infotech</h1>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
