import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import DayToWeek from "../../Helper/DayToWeek";

import { register, sendMail } from "../../redux/apiRequest";

const RegisterUser = ({ accessToken, jwt, id }) => {
  const [validated, setValidated] = useState(false);
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

  const handleRegisterUser = (e) => {
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }

    // setValidated(true);
    const newUser = {
      name,
      mssv,
      email,
      register_date: date,
      shift,
      week: DayToWeek(date),
    };
    register(accessToken, newUser, dispatch, id, navigate, jwt);
    window.location.reload(false);
    // sendMail(newUser, navigate, jwt);

    handleClose();
  };

  return (
    <>
      <Button variant="primary mb-4" onClick={handleShow}>
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
          <Form
            noValidate
            validated={validated}
            onClick={(e) => e.preventDefault()}
          >
            <Form.Group className="mb-3">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập vào họ tên"
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>MSSV</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập vào mssv"
                required
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  format="MM/dd/yyyy"
                  onChange={(date) => {
                    const dateString = new Date(date).toLocaleDateString();
                    setDate(dateString)
                  }}
                  clearable
                  InputProps={{
                    style: {
                      fontSize: 13,
                    },
                  }}
                />
              </LocalizationProvider>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ca trực</Form.Label>
              <br />
              <Form.Select required onChange={(e) => setShift(e.target.value)}>
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
