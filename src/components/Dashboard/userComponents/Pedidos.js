import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import firebase from '../../../config/firebase';
import { Link, useParams } from 'react-router-dom';


const Pedidos = () => {
    const columns = [

        {
            name: 'N° De Orden',
            selector: 'numero_orden',
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
                                <Link to={{ pathname: `/Dashboard/${uid}/DetallePedidos/${data.id_interno}`, data: data }}>
                                    <div style={{ cursor: 'pointer' }} className="text-primary"><i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                                </Link>
                            </OverlayTrigger>
                            <OverlayTrigger key={'Actualizar Estado De Pago.'} placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}><strong>Actualizar Estado De Pago.</strong></Tooltip>
                                }
                            >
                                <div style={{ cursor: 'pointer' }} onClick={() => { console.log('funciona el click') }} > <i className="fas fa-fw fa-sync-alt fa-lg" style={{ width: '35px', height: '20px', color: "#43ff36" }} /></div>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },
        },
    ];

    const conditionalRowStyles = [
        {
            when: row => row.estado_pago === 'APROBADO',
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

    let { uid } = useParams();
    const [fbUserData, setFbUserData] = useState(null);
    let pedidosToArray = [];

    useEffect(() => {
        firebase.database().ref(`/Users/${uid}/pedidos`).on('value', snapshot => {
            setFbUserData(snapshot.val());
        })
    }, [])

    if (fbUserData) {

        Object.keys(fbUserData).forEach((key, i) => {
            pedidosToArray[i] = fbUserData[key];
        });

        const paginationOptions = { rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' };

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h1 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Listado de Pedidos</h1>
                    </div>
                </div>
                <div>
                    < DataTable
                        columns={columns}
                        data={pedidosToArray}
                        persistTableHead
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        noHeader
                        conditionalRowStyles={conditionalRowStyles}
                        pagination
                        paginationComponentOptions={paginationOptions}
                    />
                </div>
            </div >
        );
    }
    else {
        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h1 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Listado de Pedidos</h1>
                    </div>
                </div>
                <div className="row" >
                    <div className="col text-center" >
                        <h4 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Aun No Has realizado ningun pedido</h4>
                    </div>
                </div>
            </div>
        )
    }
}
export default Pedidos
