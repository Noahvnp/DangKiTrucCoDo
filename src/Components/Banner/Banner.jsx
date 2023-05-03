import { Fragment } from "react";
import Image from "react-bootstrap/Image";
import "./banner.css";

function Banner() {
  return (
    <Fragment>
      <Image
        fluid
        className="container banner-img"
        src="http://localhost:8000/images/banner_cict.jpg"
        alt=""
        srcSet=""
      />
    </Fragment>
  );
}

export default Banner;
