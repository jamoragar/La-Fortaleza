import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

export const Error = () => {
    return (
        <Container>
            <Row style={{ backgroundColor: '#dc3545', marginTop: '3rem', padding: '2rem' }}>
                <Col>
                    <h2 style={{ textAlign: 'center', fontWeight: 'bolder', color: '#343a40' }}>Su Pago Fallo.</h2>
                </Col>
            </Row>
            <Row style={{ margin: ' 3rem 3rem 3rem 0' }}>
                <Col>
                    <h4 style={{ textAlign: 'initial', fontWeight: 'bolder', color: '#343a40' }}>Detalle de su Pedido :</h4>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th>Categoria</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Grimm Forest</td>
                            <td>Preventa</td>
                            <td>2</td>
                            <td>$42.291</td>
                            <td>$84.582</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>

    )
}
