import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Blog = () => {
    return (
        <div>
            < Container fluid align="center" >
                <Row>
                    <Col >
                        <Image style={{ filter: "none" }} fluid src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/WebImg%2Fpagina%20en%20construccion.png?alt=media&token=d57ebc96-98b8-4b42-965a-695ec61adc9c" alt="CONSTRUCCION" />
                    </Col>
                </Row>
            </Container >
            <Link to='/' style={{ color: "#606060" }}>Volver A la Pagina Principal...</Link>
        </div>
    )
}

export default Blog;