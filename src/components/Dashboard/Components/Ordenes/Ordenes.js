import React, { useState, useMemo } from 'react';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { usePedidos } from '../../../Hooks/usePedidos';
import { Link, useParams } from 'react-router-dom';
import ordenesStyles from './ordenes.module.scss';
import UpdateOrderState from './ActualizarEstadoPedido';

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <input className={ordenesStyles.TextField} id="search" type="text" placeholder="Estado de pago" value={filterText} onChange={onFilter} />
        <button className={ordenesStyles.ClearButton} type="button" onClick={onClear}>X</button>
    </>
);

const Ordenes = () => {
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
                                <Link to={{ pathname: `/Dashboard/${uid}/DetalleOrden/${data.id_interno}`, data: data }}>
                                    <div style={{ cursor: 'pointer' }} className="text-primary"><i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                                </Link>
                            </OverlayTrigger>
                        </div>
                        <div style={{ display: 'flex' }}>

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

    const Pedidos = usePedidos();
    const { fbPedidos } = Pedidos;
    let pedidosToArray = [];
    let pedidos = [];
    let { uid } = useParams();
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);

    //Buscador
    const [filterText, setFilterText] = useState('');
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };
        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText]);
    //Fin buscador...   

    if (fbPedidos) {

        Object.keys(fbPedidos).forEach((key, i) => {
            pedidosToArray[i] = fbPedidos[key];
        });

        pedidosToArray.forEach((pedido, i) => {
            pedidos[i] = pedido.pedidoUsuario;
        });
        
            const filteredItems = pedidos.filter(item => item.estado_pago.toLowerCase() && item.estado_pago.toLowerCase().includes(filterText.toLowerCase()));
            const paginationOptions = { rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' };

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h1 style={{ fontWeight: 'bolder', color: '#606060' }}>Listado de Ordenes</h1>
                    </div>
                </div>
                {/* <div>
                    <Button style={{ float: 'right', marginRight: '1rem', marginTop: '3rem', marginBottom: '2rem', width: '100' }} onClick={handleShow} variant="primary"> >
                    Actualizar Ordenes
                    </Button>
                    <UpdateOrderState show={showModal} onHide={() => setShowModal(false)} />
                </div> */}
                <div>
                    < DataTable
                        columns={columns}
                        data={filteredItems}
                        persistTableHead
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        conditionalRowStyles={conditionalRowStyles}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
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
                        <h1 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>Listado de Ordenes</h1>
                    </div>
                </div>
                <div className="row" >
                    <div className="col text-center" >
                        <h4 style={{ fontWeight: 'bolder', color: '#606060', marginTop: '2rem', marginBottom: '2rem' }}>No hay ordenes para mostrar.</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ordenes;
