import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./navbar.css";
import Banner from "../Banner/Banner";

import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";
const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const handleLogOut = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };
  return (
    <>
      <Banner></Banner>
      <Navbar collapseOnSelect expand="lg" className="navbar-container">
        <Navbar.Brand href="/" className="navbar-logo">
          <img
            className="logo_img"
            src="http://localhost:8000/images/logo.png"
            alt="logo_cit"
          />
          <b>
            ĐỘI THANH NIÊN TÌNH NGUYỆN <br />
            TRƯỜNG CNTT & TT{" "}
          </b>
        </Navbar.Brand>
        <div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <div className="navbar-links">
                <Link to="/" className="navbar-home">
                  {" "}
                  Trang Chủ{" "}
                </Link>
                {user ? (
                  <>
                    <p className="navbar-user">
                      Hi, <span> {user.username} </span>{" "}
                    </p>
                    <Link
                      to="/login"
                      className="navbar-logout"
                      onClick={handleLogOut}
                    >
                      {" "}
                      Đăng xuất
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="navbar-login">
                      {" "}
                      Đăng nhập{" "}
                    </Link>
                    <Link to="/register" className="navbar-register">
                      {" "}
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;
