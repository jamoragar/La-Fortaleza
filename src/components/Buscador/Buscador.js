import React, { useEffect, useState, useMemo } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import BuscadorStyles from './Buscador.module.scss'
import { Link, useParams } from 'react-router-dom';

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <div style={{ display: 'none' }}>
        <input className={BuscadorStyles.TextField} id="search" type="text" placeholder="Buscar por nombre" value={filterText} onChange={onFilter} />
        <Button type="button" style={{ display: 'none' }} onClick={onClear}>Borrar busqueda</Button>
    </div>
);

const Buscador = (props) => {
    const columns = [
        {
            name: 'Foto',
            cell: row => <a href={row.img} target='blank'><img src={row.img[0]} width='75' alt="..." /></a>,
            grow: 1,
        },
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true,
            grow: 2,

        },
        {
            name: 'Categoría',
            selector: 'categoria',
            sortable: true,
            grow: 2,
        },
        {
            name: 'Precio',
            sortable: true,
            cell: row => `$ ${row.precio}`,
            grow: 2,
        },
        {
            name: 'Stock',
            selector: 'stock',
            sortable: true,
            grow: 2,

        },
        {
            name: 'Control',
            button: true,
            cell: (data) => {
                return (
                    <div>
                        <div style={{ display: 'flex' }}>
                            <OverlayTrigger key={'ver'} placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}><strong>Ver</strong></Tooltip>
                                }
                            >
                                <Link to={{ pathname: `/Articulo/${data.id}`, data: data }}>
                                    <div style={{ cursor: 'pointer' }} className="text-success"><i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                                </Link>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },

        }
    ];

    let { Search } = useParams();

    const { fbData } = props;
    const productosToArray = fbData;

    const [filterText, setFilterText] = useState(Search);
    const filteredItems = productosToArray.filter(item => item.categoria && item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()));

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };

        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText]);

    if (filteredItems) {
        return (
            <div>
                <div className="row" style={{ marginTop: '3rem', fontWeight: 'bolder', color: '#606060' }} >
                    <div className="col text-center" >
                        <h3>Resultados de la búsqueda de "{Search}"</h3>
                    </div>
                </div>
                <DataTable
                    style={{ marginBottom: '5rem' }}
                    columns={columns}
                    data={filteredItems}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                />
            </div>
        )
    } else {
        return (
            <div className="container-fluid  px-5">
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </div>
        )
    }
};


export default Buscador;