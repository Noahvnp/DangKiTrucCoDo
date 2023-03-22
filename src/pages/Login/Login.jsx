import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <section className="login-container">
      <div className="login-title"> Đăng nhập</div>
      <form onSubmit={handleLogin}>
        <label>Tên người dùng</label>
        <input
          type="text"
          placeholder="Nhập vào tên"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập vào mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> Đăng nhập </button>
      </form>
      <div className="login-register">Chưa có tài khoản? </div>
      <Link className="login-register-link" to="/register">
        Đăng kí tài khoản ở đây{" "}
      </Link>
    </section>
  );
};

export default Login;
