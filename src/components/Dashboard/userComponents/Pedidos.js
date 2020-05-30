import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import firebase from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import DetallePedidos from './DetallePedidos';

const Pedidos = () => {
    const columns = [

        {
            name: 'N° de pedido',
            selector: 'id_interno',
            sortable: true,
            grow: 1,
        },
        {
            name: 'Estado De Pago',
            selector: 'estado_pago',
            sortable: true,
            grow: 1,
        },
        {
            name: 'Creacion de Pedido',
            selector: 'fecha_creacion_pedido',
            sortable: true,
            grow: 1,
        },
        {
            name: 'fecha de Pago',
            selector: 'fecha_validacion_pago',
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
                        pagination
                        paginationComponentOptions={paginationOptions}
                        expandableRows
                        expandableRowsComponent={<DetallePedidos fbUserData={fbUserData} uid={uid} />}
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
export default Pedidos
