import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function TableInfo() {
    return (
        < Container fluid align="center" className="md" >
            <Row>
                <Col className="px-3 py-3"><img src="img/grid3.jpg" alt="grid" width="100%" height="75%" /></Col>
                <Col className="px-3 py-3"><img src="img/grid4.jpg" alt="grid" width="100%" height="75%" /></Col>
                <Col className="px-3 py-3"><img src="img/grid5.jpg" alt="grid" width="100%" height="75%" /></Col>
            </Row>
        </Container >
    )
}





