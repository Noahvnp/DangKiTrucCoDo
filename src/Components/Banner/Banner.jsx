import { Fragment } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import "./banner.css";

function Banner() {
  // return <Fragment> 
  //   <Image fluid className="container banner-img" src="http://localhost:8000/images/banner_cict.jpg" alt="" srcSet="" />
  // </Fragment>;

  return (
    <Carousel className="container banner-img">
    <Carousel.Item interval={1000}>
      <Image fluid
        className="d-block w-100"
        src="http://localhost:8000/images/banner_cict.jpg"
        alt="First slide"
      />
    </Carousel.Item>
    {/* <Carousel.Item interval={500}>
      <Image fluid
        className="d-block w-100"
        src="http://localhost:8000/images/slide2.jpga"
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <Image fluid
        className="d-block w-100"
        src="http://localhost:8000/images/slide3.png"
        alt="Third slide"
      />
    </Carousel.Item> */}
  </Carousel>
  );
}

export default Banner;
