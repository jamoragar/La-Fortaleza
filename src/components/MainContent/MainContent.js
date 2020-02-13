import React, { Component } from  'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

class MainContent extends Component {
    render() {
        return(
            <ContainerStyle>
                <Container fluid align="center" className="md">
                    <Row>
                        <Col className="px-3 py-3"><img src="img/grid3.jpg" alt="grid" width="100%" height="75%"/></Col>
                        <Col className="px-3 py-3"><img src="img/grid4.jpg" alt="grid" width="100%" height="75%"/></Col>
                        <Col className="px-3 py-3"><img src="img/grid5.jpg" alt="grid" width="100%" height="75%"/>></Col>
                    </Row>
                </Container>
            </ContainerStyle> 
        )
    }
}

export default MainContent;

const ContainerStyle = styled.div`
    
    
`;




