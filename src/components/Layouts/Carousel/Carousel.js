import React from "react";
import { Container, Carousel, Col, Row } from "react-bootstrap";
import "./Carousel.css";

const CarouselContainer = () => {
  return (
    <Container className="p-3 mt-3 mr-0" fluid>
      <Row>
        <Col lg={8} md={8} sm={6} xs={12}>
          <Carousel interval="3000" className="w-100">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/grid3.jpg"
                alt="First slide"
                height="475"
              />
              <Carousel.Caption>
                <h3>Takenoko</h3>
                <p>
                  acompaña a nuestro simpático pandita y a nuestro laborioso
                  jardinero en las aventuras de la exótica China imperial
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/grid4.jpg"
                alt="Third slide"
                height="475"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="img/grid5.jpg"
                alt="Third slide"
                height="475"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <br />
        </Col>
        <Col lg={4} md={4} sm={6} xs={12}>
          <img
            className="d-block w-100 "
            src="img/grid3.jpg"
            alt="First slide"
            height="225"
          />
          <br />
          <img
            className="d-block w-100 "
            src="img/grid3.jpg"
            alt="First slide"
            height="225"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CarouselContainer;

