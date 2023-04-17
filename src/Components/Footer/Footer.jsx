import React from "react";
import "./footer.css";

const Footer = () => (
  <footer className="page-footer font-small blue pt-4 text-light">
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
          <p className="f">
            Khu 2, đường 3/2, Phường Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ, Việt
            Nam
          </p>
          {/* <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul> */}
        </div>

        {/* <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </div> */}
      </div>
      <div className="footer-copyright text-center p-3">
        © 2023 Đại học Cần Thơ
      </div>
    </div>
  </footer>
);

export default Footer;
