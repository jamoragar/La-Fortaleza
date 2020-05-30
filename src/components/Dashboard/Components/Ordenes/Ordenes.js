import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { usePedidos } from '../../../Hooks/usePedidos';
import { Link, useParams } from 'react-router-dom';

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
            sortable: true,
            grow: 1,
            cell: (data) => {
                return data.delivery === true ? (
                    <div className="text-primary">
                        <i className="fas fa-check fa-2x"></i>
                    </div>
                ) :
                    (
                        <div className="text-danger">
                            <i className="fas fa-times fa-2x"></i>
                        </div>
                    )
            },

        },
        {
            name: 'Envuelto para Regalo?',
            sortable: true,
            grow: 1,
            cell: (data) => {
                return data.regalo === true ? (
                    <div className="text-primary">
                        <i className="fas fa-check fa-2x"></i>
                    </div>
                ) :
                    (
                        <div className="text-danger">
                            <i className="fas fa-times fa-2x"></i>
                        </div>
                    )
            },

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
        {
            name: 'Control',
            button: true,
            grow: 1,
            cell: (data) => {
                return (
                    <div>
                        <div style={{ display: 'flex' }}>
                            <OverlayTrigger key={'Detalle De La Orden'} placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}><strong>Ver</strong></Tooltip>
                                }
                            >
                                <Link to={{ pathname: `/Dashboard/${uid}/DetalleOrden/${data.id_interno}`, data: data }}>
                                    <div style={{ cursor: 'pointer' }} className="text-primary"><i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                                </Link>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },
        },
    ];

    const conditionalRowStyles = [
        {
            when: row => row.estado_pago === 'APROVADO',
            style: {
                backgroundColor: '#28a745;',
                color: 'white',
            },
        },
        {
            when: row => row.estado_pago === 'PENDIENTE',
            style: {
                backgroundColor: '#ffc107;',
                color: 'white',
            },
        },
        {
            when: row => row.estado_pago === 'RECHAZADO',
            style: {
                backgroundColor: '#dc3545;',
                color: 'white',
            },
        },
    ];

    const Pedidos = usePedidos();
    const { fbPedidos } = Pedidos;
    let pedidosToArray = [];
    let pedidos = [];
    let { uid } = useParams();

    if (fbPedidos) {

        Object.keys(fbPedidos).forEach((key, i) => {
            pedidosToArray[i] = fbPedidos[key];
        });

        pedidosToArray.forEach((pedido, i) => {
            pedidos[i] = pedido.pedidoUsuario;
        });

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
                        conditionalRowStyles={conditionalRowStyles}
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
