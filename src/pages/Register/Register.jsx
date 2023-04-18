import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";

import Button from 'react-bootstrap/Button';
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
        email,
        username,
        password
    };

    registerUser(newUser, dispatch, navigate);
  }

  return (
    <section className="register-container">
      <div className="register-title"> Đăng ký </div>
      <form onSubmit={handleRegister}>
        <label>Email</label>
        <input
          type="text"
          placeholder="Nhập vào email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Tên người dùng</label>
        <input
          type="text"
          placeholder="Nhập tên người dùng"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="primary" type="submit"> Tạo tài khoản </Button>
      </form>
    </section>
  );
};

export default Register;
