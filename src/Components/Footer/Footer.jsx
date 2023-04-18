import React from "react";
import "./footer.css";

const Footer = () => (
  <footer className="page-footer font-small blue mt-4 pt-4 text-light">
    <div className="container-fluid text-center text-md-left footer-container pt-4">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <img
            src="https://www.ctu.edu.vn/images/upload/Asset_33logofooter.png"
            alt="logo-footer"
            className="mt-3"
            width={`60%`}
          />
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md mb-md-0 mb-3">
          <h3 className="pt-3">Trường Công nghệ Thông tin & Truyền Thông</h3>
          <small className="ml-0">
            Khu 2, đường 3/2, Phường Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ, Việt Nam
            <br />
            Điện thoại: 84 0292 3 734713 - 0292 3 831301
            <br />
            Fax: 84 0292 3830841; Email: office@cit.ctu.edu.vn
          </small>
        </div>
      </div>
      <div className="footer-copyright text-center mt-4 p-3">
        © 2023 Đại học Cần Thơ
      </div>
    </div>
  </footer>
);

export default Footer;
