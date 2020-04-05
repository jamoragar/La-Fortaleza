import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const _404 = () => {
    return (
        <div>
            < Container fluid align="center" >
                <Row>
                    <Col >
                        <img src="img/pageNotFound.png" alt="NOTFOUND" />
                    </Col>
                </Row>
            </Container >
            <Link to='/'>Volver A la Pagina Principal...</Link>
        </div>
    )
}

export default _404;

