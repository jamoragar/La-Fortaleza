import React from "react";
import { Container, Carousel, Col, Row } from "react-bootstrap";
import './Carousel.css';

const CarouselContainer = () => {

  return (
    <Container className="p-3 mt-3 mr-0" fluid>
      <Row>
        <Col lg={8} md={8} sm={6} xs={12}>
          <Carousel interval="3000" className="w-100">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2FSlider-Pandemic.png?alt=media&token=c1edaca8-b131-4dd7-88ba-f64d8e2e2472"
                alt="First slide"
                height="475"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2FSliderUgears.png?alt=media&token=e51628d1-6b6c-43cc-9c21-692b8ce31af9"
                alt="Third slide"
                height="475"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <br />
        </Col>
        <Col lg={4} md={4} sm={6} xs={12}>
          <img
            className="d-block w-100 "
            src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2Fgrid1.png?alt=media&token=284c98da-0f09-4756-b5eb-bb73d6bc39d5"
            alt="First slide"
            height="225"
          />
          <br />
          <img
            className="d-block w-100 "
            src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2Fgrid2.png?alt=media&token=f78c89ed-1ec5-405e-bf71-eef8f3ad593f"
            alt="First slide"
            height="225"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CarouselContainer;

