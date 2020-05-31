import React, { useState, useEffect } from 'react';
import { Spinner, Table, Form, Col, Container, InputGroup, Button } from 'react-bootstrap';
import firebase from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import { useUserData } from '../../Hooks/useUserData';

const DetallePedidos = (props) => {
    const [infoUserPedido, setInfoUserPedido] = useState();
    const userData = useUserData();
    const { fbUserData } = userData;
    const { history } = props;
    let { id_interno, uid } = useParams();
    let pedidoToArray = [];
    let userDataToArray = [];

    useEffect(() => {
        firebase.database().ref(`Users/${uid}/pedidos/${id_interno}`).on('value', snapshot => {
            setInfoUserPedido(snapshot.val());
        });
    }, []);

    console.log(fbUserData);

    if (infoUserPedido && fbUserData) {

        Object.keys(infoUserPedido).forEach((key, i) => {
            pedidoToArray[i] = infoUserPedido[key];
        });

        Object.keys(fbUserData).forEach((key, i) => {
            userDataToArray[i] = fbUserData[key];
        });

        console.log(userDataToArray);
        console.log(infoUserPedido);

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h2 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Detalle Orden</h2>
                    </div>
                </div>
                <div className="row" >
                    <div className="col text-center" >
                        <h4 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Informacion de cliente</h4>
                    </div>
                </div>
                <div className="row" >
                    <div className="col text-center" >
                        <Container fluid>
                            <Form >
                                <Form.Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group>
                                            <Form.Label>Nombre(s)</Form.Label>
                                            <Form.Control type='text' name='nombre' defaultValue={fbUserData.nombre} readOnly />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Group>
                                            <Form.Label>Apellido(s)</Form.Label>
                                            <Form.Control type='text' name='last_name' defaultValue={fbUserData.apellido} readOnly />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group>
                                            <Form.Label>Dirección</Form.Label>
                                            <Form.Control type="email" name='address' defaultValue={fbUserData.direccion} readOnly />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <Form.Group>
                                            <Form.Label>E-mail</Form.Label>
                                            <Form.Control type="email" name='email' defaultValue={fbUserData.email} readOnly />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group>
                                            <Form.Label>Telefono</Form.Label>
                                            <InputGroup>
                                                <Form.Control type='text' name='number' defaultValue={fbUserData.numero} readOnly />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Label>Comentario:</Form.Label>
                                    <Form.Control as='textarea' rows='3' name='comentario' defaultValue={fbUserData.comentario} readOnly />
                                </Form.Group>
                            </Form>
                        </Container>
                    </div>
                </div>
                <div className="row" >
                    <div className="col text-center" >
                        <h4 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Informacion de Pedido</h4>
                    </div>
                </div>
                <div className="row" >
                    <div className="col text-center" >
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Id interno</th>
                                    <th>Estado de Pago</th>
                                    <th>Creacion De Pedido</th>
                                    <th>Fecha de Pago</th>
                                    <th>Delivery</th>
                                    <th>Para Regalo</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{infoUserPedido.id_interno}</td>
                                    <td>{infoUserPedido.estado_pago}</td>
                                    <td>{infoUserPedido.fecha_creacion_pedido}</td>
                                    <td>{infoUserPedido.fecha_validacion_pago}</td>
                                    <td>{infoUserPedido.delivery === true ? <div>Si</div> : <div> no</div>} </td>
                                    <td>{infoUserPedido.regalo === true ? <div>Si</div> : <div> no</div>}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="row" >
                    <div className="col text-center" >
                        <h4 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Detalle Productos</h4>
                    </div>
                </div>
                <div className="row" >
                    <div className="col text-center" >
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>*</th>
                                    <th>Nombre</th>
                                    <th>Categoria</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidoToArray ? pedidoToArray[5].map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.unit_price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                                            <td>{(item.unit_price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                                        </tr>
                                    )
                                })
                                    :
                                    (
                                        <tr>
                                            <td>{'Cargando información del pedido...'}</td>
                                        </tr>
                                    )}
                            </tbody>
                        </Table>
                        <div className="row" >
                            <div className="col text-center" >
                                <h4 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Precio Total del Pedido: {pedidoToArray[6].toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h4>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline-primary" block onClick={() => history.goBack()}>
                        <i className="fas fa-undo fa-fw" />
                    Volver
                </Button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </>
        )
    }
}
export default DetallePedidos;
