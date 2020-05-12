import React from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';



const Ordenes = () => {
    const columns = [

    ];


    const opcion = () => window.confirm('Esta seguro que desea eliminar esta categoria?');



    if (columns) {

        const paginationOptions = { rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' };

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h1 style={{ fontWeight: 'bolder', color: '#606060' }}>Listado de Ordenes</h1>
                    </div>
                </div>
                < DataTable
                    columns={columns}
                    data={columns}
                    persistTableHead
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    noHeader
                    pagination
                    paginationComponentOptions={paginationOptions}
                    expandableRows
                />
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