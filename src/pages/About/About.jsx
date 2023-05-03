import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import "./about.css";

function TabsExample() {
  return (
    <div className="about-container">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#congviec">
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action variant="primary" href="#congviec">
                CÔNG VIỆC
              </ListGroup.Item>
              <ListGroup.Item action variant="success" href="#luuy">
                LƯU Ý
              </ListGroup.Item>
              <ListGroup.Item action variant="danger" href="#lienhe">
                MỌI THẮC MẮC / Ý KIẾN ĐÓNG GÓP
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8} className="info">
            <Tab.Content>
              <Tab.Pane eventKey="#congviec">
                <p>
                  - Nhắc nhở các anh chị và các bạn về trang phục, thẻ sinh
                  viên, giày dép, tưới cây cuối buổi, thực hiện các công việc
                  khi được điều động.
                  <br /> - Chi tiết công việc sẽ được thông tin vào đầu buổi trực
                  <br /> - Hoạt động sẽ kéo dài trong một kỳ và thực hiện hàng
                  tuần nên các bạn cứ sắp xếp thời gian để đủ 3 buổi nhé!
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="#luuy">
                - Có mặt đúng giờ để điểm danh trễ quá 15p sẽ không được ghi
                nhận <br />- Trang phục: áo xanh thanh niên, mang thẻ sinh viên
                (suốt buổi trực) , giày, dép đúng qui định.
                <br /> - Mỗi buổi trực tối đa 6 bạn, trực đủ 3 buổi sẽ được ghi
                nhận thành tích{" "}
              </Tab.Pane>
              <Tab.Pane eventKey="#lienhe">
                - Đ/c Phan Gia Bảo - UV BCH Đội TNTN
                <br /> - SĐT (Zalo) : 0789668217
                <br /> - Email: baob2110114@student.ctu.edu.vn
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default TabsExample;
