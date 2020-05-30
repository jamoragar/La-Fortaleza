import React, { useState, useEffect } from 'react';
import { Spinner, Table, Form, Col, Container, InputGroup, Button } from 'react-bootstrap';
import firebase from '../../../config/firebase';
import { useParams } from 'react-router-dom';

const DetallePedidos = (props) => {
    const [infoUserPedido, setInfoUserPedido] = useState();
    const { history } = props;
    let { id_interno, uid } = useParams();
    let pedidoToArray = [];
    let orderInfo = [];

    useEffect(() => {
        firebase.database().ref(`Users/${uid}/pedidos/${id_interno}`).on('value', snapshot => {
            setInfoUserPedido(snapshot.val());
        });
    }, []);

    if (infoUserPedido) {

        Object.keys(infoUserPedido).forEach((key, i) => {
            pedidoToArray[i] = infoUserPedido[key];
        });

        console.log(pedidoToArray);

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h2 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Detalle Orden</h2>
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
                                    <td>{pedidoToArray[4]}</td>
                                    <td>{pedidoToArray[1]}</td>
                                    <td>{pedidoToArray[2]}</td>
                                    <td>{pedidoToArray[3]}</td>
                                    <td>{pedidoToArray[0] === true ? <div>Si</div> : <div> no</div>} </td>
                                    <td>{pedidoToArray[7] === true ? <div>Si</div> : <div> no</div>}</td>
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
                                <h4 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Valor Total De La Orden: {pedidoToArray[6].toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h4>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline-primary" block onClick={() => history.goBack()}>
                        <i className="fas fa-undo fa-fw" />
                    Volver
                </Button>
                </div>
            </div >
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
