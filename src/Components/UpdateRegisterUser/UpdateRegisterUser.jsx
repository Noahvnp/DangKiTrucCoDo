import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { format } from "date-fns";
import DayToWeek from "../../Helper/DayToWeek";

import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { register } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

const UpdateRegisterUser = ({ accessToken, jwt, id }) => {
  const [name, setName] = useState("");
  const [mssv, setMssv] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState();
  const [shift, setShift] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegisterUser = ({row}) => {
    const newUser = {
      name,
      mssv,
      email,
      register_date: format(date, "MM/dd/yyyy"),
      shift,
      week: DayToWeek(date),
    };
    register(accessToken, newUser, dispatch, id, navigate, jwt);
    handleClose();
  };

  return (
    <>
      <IconButton sx={{ maxWidth: "20px" }} onClick={handleShow}>
        <Edit />
      </IconButton>

      <Modal show={show} onHide={handleClose} className="">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="w-100 text-center">
            CHỈNH SỬA <br /> SINH VIÊN ĐĂNG KÍ
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
              <input
                type="date"
                // defaultValue={new Date()}
                onChange={(e) => setDate(new Date(e.target.value))}
              ></input>
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

export default UpdateRegisterUser;
