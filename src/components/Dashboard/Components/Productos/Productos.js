import React, { useState, useEffect, useMemo } from 'react';
import firebase from '../../../../config/firebase';
import { OverlayTrigger, Tooltip, Button, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import AgregarProducto from './AgregarProducto';
import productosStyles from './Productos.module.scss'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <input className={productosStyles.TextField} id="search" type="text" placeholder="Buscar por nombre" value={filterText} onChange={onFilter} />
        <button className={productosStyles.ClearButton} type="button" onClick={onClear}>X</button>
    </>
);

const Productos = (props) => {
    let { uid } = useParams();
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
            width: '20%'
        },
        {
            name: 'Precio',
            sortable: true,
            cell: row => `$ ${row.precio}`,
            width: '10%'
        },
        {
            name: 'Stock',
            selector: 'stock',
            sortable: true,
            width: '50px',

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
                                <Link to={{ pathname: `/Dashboard/${uid}/Producto/${data.id}`, data: data }}>
                                    <div style={{ cursor: 'pointer' }} className="text-success"><i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                                </Link>
                            </OverlayTrigger>
                            <OverlayTrigger key={'editar'} placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}><strong>Editar</strong></Tooltip>
                                }
                            >
                                <Link to={{ pathname: `/Dashboard/${uid}/Producto/Editar/${data.id}`, data: data }}>
                                    <div style={{ cursor: 'pointer' }} className="text-primary"><i className="fa fa-fw fa-edit fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                                </Link>
                            </OverlayTrigger>
                            <OverlayTrigger key={'eliminar'} placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}><strong>Eliminar</strong></Tooltip>
                                }
                            >
                                <div style={{ cursor: 'pointer' }} onClick={() => (opcion(true)) ? deleteProduct(data) : null} className="text-danger"><i className="fa fa-fw fa-trash fa-lg" style={{ height: '20px' }} /></div>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },

        }
    ];

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const [productos, setProductos] = useState([]);
    let productosToArray = [];

    const opcion = () => window.confirm('Esta seguro que desea eliminar este producto?');

    useEffect(() => {
        firebase.database().ref('/Productos').on('value', snapshot => {
            if (snapshot.val()) { setProductos(snapshot.val()); }
        });
    }, []);

    const deleteProduct = (product) => {
        const ref = firebase.storage().ref(`/IMG/Productos/${product.nombre}`);
        firebase.database().ref(`/Productos/${product.id}`).remove().then(() => {
            ref.listAll().then((dir) => {
                dir.items.forEach(fileRef => {
                    deleteFile(ref.fullPath, fileRef.name)
                });
            })
        });
        const deleteFile = (pathToFile, fileName) => {
            const ref = firebase.storage().ref(pathToFile);
            const childRef = ref.child(fileName);
            childRef.delete()
        }
    }

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

    if (productos || productos.length >= 0) {

        Object.keys(productos).forEach((key, i) => {
            productosToArray[i] = productos[key]
        });

        const filteredItems = productosToArray.filter(item => item.nombre.toLowerCase() && item.nombre.toLowerCase().includes(filterText.toLowerCase()));

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h1 style={{ ontWeight: 'bolder', color: '#606060' }}>Mantenedor De Productos</h1>
                    </div>
                </div>
                <Button style={{ float: 'right' }} onClick={handleShow} variant="primary">
                    <i className="fas fa-tag fa-fw" />
                        Agregar Producto
                </Button>
                <AgregarProducto show={showModal} onHide={() => setShowModal(false)} />
                <DataTable
                    title="Productos"
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

export default Productos;