import React, { Component } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import styled from 'styled-components';

class CarouselContainer  extends Component{
    render(){
        return(
            <CarouselStyle>
                <Container> 
                    <Carousel interval="2000">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="img/grid3.jpg"
                                alt="First slide"
                                height="450"
                            />
                            <Carousel.Caption>
                                <h3>Takenoko</h3>
                                <p>acompaña a nuestro simpático pandita y a nuestro laborioso jardinero en las aventuras de la exótica China imperial</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="img/grid4.jpg"
                                alt="Third slide"
                                height="450"
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
                                height="450"
                            />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>        
                </Container>
            </CarouselStyle>
        )
    }
}

export default CarouselContainer;

const CarouselStyle = styled.div`
    border: 4px;
    padding-top: 2rem;
    padding-bottom: 2rem;
    text-align: center;
`;