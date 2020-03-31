import React from "react";
import { Container, Carousel, Col, Row } from "react-bootstrap";
import './Carousel.css';

const CarouselContainer = (props) => {
  const {fbSlider} = props;
  let slides = [];
  let colButtons = [];
  Object.entries(fbSlider).forEach(([title, content]) => {
    title === 'Buttons' ? 
        (
          content.forEach((img, i) => {
            colButtons[i] = img;
          })
        ) 
      :
        (
          content.forEach((img, j) => {
            slides[j] = img;
          })
        )
  });

  return (
    <Container className="p-3 mt-3 mr-0" fluid>
      <Row>
        <Col lg={8} md={8} sm={6} xs={12}>
          <Carousel interval="3000" className="w-100">
            {slides.map((slide, i) => {
              return(
                <Carousel.Item key={i}>
                  <img
                    className="d-block w-100"
                    src={slide}
                    alt={`slide número: ${i}`}
                    height="475"
                  />
                  <Carousel.Caption>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>
          <br />
        </Col>
        <Col lg={4} md={4} sm={6} xs={12}>
          {colButtons.map((button, i) => {
            return(
              <div key={i}>
                <img
                  className="d-block w-100 "
                  src={button}
                  alt={`img button: ${i}`}
                  height="225"
                />
                <br />
              </div>
            )
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default CarouselContainer;

