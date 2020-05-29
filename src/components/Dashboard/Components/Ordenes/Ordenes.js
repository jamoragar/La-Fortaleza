import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import firebase from '../../../../config/firebase';

const Ordenes = () => {
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
            name: 'Fecha De Pedido',
            selector: 'fecha_creacion_pedido',
            sortable: true,
            grow: 1,

        },

    ];

    const [fbUserInfo, setFbUserInfo] = useState(null);
    let userInfoToArray = [];
    let ordenes = [];

    useEffect(() => {
        firebase.database().ref('/Users').on('value', snapshot => {
            setFbUserInfo(snapshot.val());
        })
    }, []);

    const opcion = () => window.confirm('Esta seguro que desea eliminar esta categoria?');
    if (fbUserInfo) {

        Object.keys(fbUserInfo).forEach((key, i) => {
            userInfoToArray[i] = fbUserInfo[key]
        });

        userInfoToArray.forEach((usersInfo, i) => {
            ordenes[i] = usersInfo.pedidos;
        });


        console.log(ordenes);
        const paginationOptions = { rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' };

        return (
            <div>
                {ordenes.map((categoriaProducto, i) => {
                    return (
                        <div className="row" >
                            <div className="col text-center" >
                                <h1 style={{ fontWeight: 'bolder', color: '#606060' }}>Listado de Ordenes</h1>
                            </div>
                        </div>
                    )
                })}
            </div>
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


{/* < DataTable
                    columns={columns}
                    data={ordenes}
                    persistTableHead
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    noHeader
                    pagination
                    paginationComponentOptions={paginationOptions}
                    expandableRows
               />*/}