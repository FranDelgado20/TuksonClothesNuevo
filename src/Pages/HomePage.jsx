import React from 'react'
import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {
  return (
    <section>

    <Carousel className="carousel" >
      <Carousel.Item >
        <img src="/img/carousel.jpg" className=" d-block w-100" alt="" />
        
      </Carousel.Item>
      <Carousel.Item>
      <img src="/img/carousel1.jpg" className="d-block w-100" alt="" />
       
      </Carousel.Item>
      <Carousel.Item>
      <img src="/img/carousel2.jpg" className="d-block w-100" alt="" />
        
      </Carousel.Item>
      <Carousel.Item>
      <img src="/img/carousel3.jpg" className="d-block w-100" alt="" />
        
      </Carousel.Item>
    </Carousel>
  </section>
  )
}

export default HomePage