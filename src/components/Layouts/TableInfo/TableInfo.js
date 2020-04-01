import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function TableInfo() {
    return (
        < Container fluid align="center" >
            <Row>
                <Col className="px-3 py-3" lg={4} md={4} sm={12} xs={12}><img src="img/grid3.jpg" alt="grid" width="100%" height="75%" /></Col>
                <Col className="px-3 py-3" lg={4} md={4} sm={12} xs={12}><img src="img/grid4.jpg" alt="grid" width="100%" height="75%" /></Col>
                <Col className="px-3 py-3" lg={4} md={4} sm={12} xs={12}><img src="img/grid5.jpg" alt="grid" width="100%" height="75%" /></Col>
            </Row>
        </Container >
    )
}