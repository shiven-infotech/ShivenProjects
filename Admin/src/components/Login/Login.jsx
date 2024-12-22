import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AdminLogin } from "../../redux/reducer";
import Cookies from "universal-cookie";
export default function Login() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    username: "",
    password: "",
  });
  const { pending, admins } = useSelector((state) => state.shiven);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AdminLogin(admin));
  };
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  //   const notify = () => {
  //     toast.warn("Pleace Valid Data Enter!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Bounce,
  //     });
  //   };
  //     useEffect(() => {
  //         if (admins && admins.success === false) {
  //             notify()
  //         }
  //     }, [admins])
  return (
    <>
      {admins && admins.success === true && cookie.get("authtoken") && (
        <>{navigate("/")}</>
      )}
      <div className="login">
        <form method="post" action="/" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="form-control"
              placeholder="Username...."
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="password"
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
          {pending === true && <p>Loading...</p>}
        </form>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
}
