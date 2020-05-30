import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import firebase from '../../../config/firebase';
import { useParams } from 'react-router-dom';

const DetallePedidos = (props) => {
    const columns = [

        {
            name: 'Nombre',
            selector: 'title',
            sortable: true,
            grow: 1,
        },
        {
            name: 'Categoria',
            selector: 'desciption',
            sortable: true,
            grow: 1,
        },
        {
            name: 'id Producto',
            selector: 'id',
            sortable: true,
            grow: 1,
        },
        {
            name: 'Cantidad',
            selector: 'quantity',
            sortable: true,
            grow: 1,
        },
        {
            name: 'Tipo De Moneda',
            selector: 'currency_id',
            sortable: true,
            grow: 1,
        },
        {
            name: 'Precio Unitario',
            selector: 'unit_price',
            sortable: true,
            grow: 1,
        },

    ];

    let { uid } = useParams();
    const { fbUserData } = props;
    let pedidosToArray = [];

    if (fbUserData) {

        Object.keys(fbUserData).forEach((key, i) => {
            pedidosToArray[i] = fbUserData[key];
        });

        const DetallePedidos = pedidosToArray[0].items;

        console.log(DetallePedidos)
        const paginationOptions = { rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' };

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h1 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Detalle De Productos</h1>
                    </div>
                </div>
                <div>
                    < DataTable
                        columns={columns}
                        data={DetallePedidos}
                        persistTableHead
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        noHeader
                        pagination
                        paginationComponentOptions={paginationOptions}
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
export default DetallePedidos;
