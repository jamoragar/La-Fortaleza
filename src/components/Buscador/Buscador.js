import React, { useEffect, useState, useMemo } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import firebase from '../../config/firebase';
import DataTable from 'react-data-table-component';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import BuscadorStyles from './Buscador.module.scss'
import { Link, useParams } from 'react-router-dom';

const FilterComponent = ({ filterText, onFilter, onClear, keySearch }) => (
    <>
        <input className={BuscadorStyles.TextField} id="search" type="text" placeholder="Buscar por nombre" value={keySearch} onChange={onFilter} />
        <button className={BuscadorStyles.ClearButton} type="button" onClick={onClear}>X</button>
    </>
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

    const { keySearch } = props;
    console.log(`log de buscador ${keySearch}`)

    const [productos, setProductos] = useState([]);
    let productosToArray = [];

    useEffect(() => {
        firebase.database().ref('/Productos').on('value', snapshot => {
            if (snapshot.val()) { setProductos(snapshot.val()); }
        });
    }, []);

    Object.keys(productos).forEach((key, i) => {
        productosToArray[i] = productos[key]
    });

    const [filterText, setFilterText] = useState('');
    const filteredItems = productosToArray.filter(item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()));

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText("keySearch");
            }
        };

        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText]);

    return (
        <div>
            <DataTable
                columns={columns}
                data={filteredItems}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
            />
        </div>
    );
};


export default Buscador;