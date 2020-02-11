import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Style = styled.div`
  background: #343a40;
`;

export const Header = () => (
  <>
  
    <Style>
      <Container fluid>
        <Row>
        <Col xs="3"><a href="/"><img src="img/Logo.png" width="350px" class="img-fluid" alt="logo" /></a></Col>
        <Col xs="auto">.col-auto - variable width content</Col>
        <Col xs="3">.col-3</Col>
        </Row>
      </Container>
    </Style>
    
  </>
)