import React from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';

const Ofertas = () => {
    return (
        < div align="center" style={{ padding: '0', backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/WebImg%2Fstarbackgrpund.png?alt=media&token=aa5e367a-d8f8-4aa5-ac9c-c6f58469a0e1)' }} >
            <Row>
                <Col >
                    <Image style={{ filter: "none", maxWidth: '55%' }} fluid src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/WebImg%2Fpagina%20en%20construccion.png?alt=media&token=d57ebc96-98b8-4b42-965a-695ec61adc9c" alt="CONSTRUCCION" />
                </Col>
            </Row>
            <Link to='/' style={{ color: "#606060" }}>
                <Image style={{ filter: "none", maxWidth: '45%' }} fluid src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/WebImg%2Fvolver.png?alt=media&token=19027575-1728-442e-ab9c-25ffe9da57a2" alt="vovler" />
            </Link>
        </div>
    )
}

export default Ofertas;

