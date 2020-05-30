import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { usePedidos } from '../../../Hooks/usePedidos';
import DetalleOrden from './DetalleOrden';

const Ordenes = () => {
    const columns = [

        {
            name: 'Id de pedido',
            selector: 'id_interno',
            sortable: true,
            grow: 1,

        },
        {
            name: 'Estado de Pago',
            selector: 'estado_pago',
            sortable: true,
            grow: 1,

        },
        {
            name: 'Delivery',
            selector: 'delivery',
            sortable: true,
            grow: 1,

        },
        {
            name: 'Envuelto para Regalo?',
            selector: 'regalo',
            sortable: true,
            grow: 1,

        },
        {
            name: 'Fecha de Pedido',
            selector: 'fecha_creacion_pedido',
            sortable: true,
            grow: 1,

        },
        {
            name: 'Fecha de Pago',
            selector: 'fecha_validacion_pago',
            sortable: true,
            grow: 1,

        },
    ];

    const Pedidos = usePedidos();
    const { fbPedidos } = Pedidos;
    let pedidosToArray = [];
    let pedidos = [];
    let infoUsuario = [];
    let orderItems = [];

    if (fbPedidos) {

        Object.keys(fbPedidos).forEach((key, i) => {
            pedidosToArray[i] = fbPedidos[key];
        });

        pedidosToArray.forEach((pedido, i) => {
            infoUsuario[i] = pedido.pedidoUsuario;
        });

        pedidosToArray.forEach((pedido, i) => {
            pedidos[i] = pedido.pedidoUsuario;
        });

        console.log(pedidosToArray)
        const paginationOptions = { rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' };

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h1 style={{ fontWeight: 'bolder', color: '#606060' }}>Listado de Ordenes</h1>
                    </div>
                </div>
                <div>
                    < DataTable
                        columns={columns}
                        data={pedidos}
                        persistTableHead
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        noHeader
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={<DetalleOrden infoUsuario={infoUsuario} pedidos={pedidos} />}
                    />
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

export default Ordenes;
