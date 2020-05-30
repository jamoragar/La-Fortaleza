import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const DetalleOrden = (props) => {
    const columns = [

        {
            name: 'Producto',
            selector: 'title',
            sortable: true,
            grow: 1,

        },
        {
            name: 'Categoria',
            selector: 'description',
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
            name: 'Id Producto',
            selector: 'quantity',
            sortable: true,
            grow: 1,

        },
        {
            name: 'Precio',
            selector: 'unit_price',
            sortable: true,
            grow: 1,

        },

    ];

    const { pedidos } = props;
    let ordenesToArray = [];
    let orderList = [];


    if (pedidos) {

        Object.keys(pedidos).forEach((key, i) => {
            ordenesToArray[i] = pedidos[key];
        });

        ordenesToArray.forEach((order, i) => {
            orderList[i] = order.items[0];
        });

        console.log(orderList);



        const paginationOptions = { rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' };

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h3 style={{ fontWeight: 'bolder', color: '#606060' }}>Detalle</h3>
                    </div>
                </div>
                <div>
                    < DataTable
                        columns={columns}
                        data={orderList}
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

export default DetalleOrden;
