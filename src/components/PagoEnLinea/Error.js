import React, {useState} from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import credentials from './credentials.json'
import moment from 'moment';
import timezone from './timezone.json';

export const Error = () => {
    const [preference, setPreference] = useState(null);
    const [collection, setCollection] = useState(null);
    
    moment.tz.add(timezone.Punta_Arenas);// Establecemos zona horaria

    const validatingPreference = (id) => {
        fetch(`https://api.mercadopago.com/checkout/preferences/${id}?access_token=${credentials.access_token}`)
            .then(response => response.json())
            .then(data => {
                if(data.status === 404){
                    setPreference(0)
                    alert(`Error. La preferencia con el identificador ${id} no fue encontrada.`);
                }else{
                    setPreference(data)
                }
            })
            .catch(error => {
                console.log(error);
            })
    };
    const validatingCollection = (id) => {
        fetch(`https://api.mercadopago.com/v1/payments/${id}?access_token=${credentials.access_token}`)
            .then(response => response.json())
            .then(data => {
                if(data.status === 404){
                    setCollection(0)
                    alert(`Número de operación: ${id} no encontrado`);
                }else{
                    setCollection(data)
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

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
