import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const DetalleOrden = (props) => {
    const { infoPedido } = props;
    let pedidosToArray = [];
    let Pedidos = [];
    let Items = [];
    let orderItems = [];

    if (infoPedido) {

        Object.keys(infoPedido).forEach((key, i) => {
            pedidosToArray[i] = infoPedido[key];
        });

        pedidosToArray.forEach((pedido, i) => {
            Pedidos[i] = pedido;
        });

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h3 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Detalle</h3>
                    </div>
                </div>
                <div>

                </div>
            </div >
        );
    }
    else {
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

export default DetalleOrden;
