import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { register } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

const RegisterUser = ({ accessToken, jwt, id }) => {
  const [name, setName] = useState("");
  const [mssv, setMssv] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegisterUser = (e) => {
    const newUser = {
      name,
      mssv,
      email,
      register_date: new Date(date).toISOString(),
      shift,
    };
    register(accessToken, newUser, dispatch, id, navigate, jwt);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Đăng ký trực cờ đỏ
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="w-100 text-center">
            ĐĂNG KÝ TRỰC CỜ ĐỎ <br />
            TRƯỜNG CNTT-TT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onClick={(e) => e.preventDefault()}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập vào họ tên"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>MSSV</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập vào mssv"
                onChange={(e) => setMssv(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập vào email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngày trực</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ca trực</Form.Label>
              <br />
              <Form.Select onChange={(e) => setShift(e.target.value)}>
                <option>Chọn ca trực</option>
                <option value="sáng">Sáng</option>
                <option value="chiều">Chiều</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleRegisterUser}>
            Đăng ký
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterUser;
