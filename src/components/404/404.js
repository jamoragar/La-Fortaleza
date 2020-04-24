import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

const _404 = () => {
    return (
        <div>
            < Container fluid align="center" >
                <Row>
                    <Col >
                        <Image fluid style={{ filter: "none" }} src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/WebImg%2FPAGE%20NOT%20FOUND%20PICARD.png?alt=media&token=e9fde158-38ad-4074-befa-02b3a52afbf3" alt="NOTFOUND" />
                    </Col>
                </Row>
            </Container >
            <Link to='/' style={{ color: "#606060" }}>Volver A la Pagina Principal...</Link>
        </div>
    )
}

export default _404;

