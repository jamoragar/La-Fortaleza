import React, { useState, useEffect } from 'react';
import firebase from '../../../../config/firebase';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import AgregarProducto from './AgregarProducto';
import EditarProducto from './EditarProducto';
const Productos = () => {
    const columns = [
        {
            name: 'Foto',
            cell: row => <img src={row.img[0]} width='75' alt="..." />,
            grow:1,
        },
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true,
            grow:2,

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
            width:'10%'
        },
        {
            name: 'Stock',
            selector: 'stock',
            sortable: true,
            width:'50px',

        },
        {
            name:'Control',
            button:true,
            cell: (data) => {return(
                        <div style={{display: 'flex'}}>
                            <OverlayTrigger key={'ver'} placement={'left'}
                                overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Ver</strong></Tooltip>
                                }
                            >
                            <Link to={{pathname: `/Dashboard/Producto/${data.id}`, data: data }}>
                                <div style={{ cursor: 'pointer' }} className="text-success"><i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                            </Link>
                        </OverlayTrigger>
                        <OverlayTrigger key={'editar'} placement={'left'}
                            overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Editar</strong></Tooltip>
                                }
                            >
                            <div 
                                style={{ cursor: 'pointer' }}
                                className="text-primary"
                                onClick={() => {
                                    setDataProducto(data);
                                    handleShowEditarProductos();
                                }}
                            >
                                <i className="fa fa-fw fa-edit fa-lg" style={{ width: '35px', height: '20px' }}/>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger key={'eliminar'} placement={'left'}
                            overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Eliminar</strong></Tooltip>
                                }
                            >
                                <div style={{cursor:'pointer'}} onClick={()=>deleteProduct(data)} className="text-danger"><i className="fa fa-fw fa-trash fa-lg" style={{height:'20px'}}/></div>
                            </OverlayTrigger>
                        </div>
                        )
                    },

        }
    ];
    const [dataProducto, setDataProducto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditarProductos, setShowEditarProductos] = useState(false)
    const [productos, setProductos] = useState([])
    const handleShow = () => setShowModal(true);
    let productosToArray = [];
    useEffect(() => {
        firebase.database().ref('/Productos').on('value', snapshot => {
            if(snapshot.val()){setProductos(snapshot.val());}
        });
    }, []);
    const handleShowEditarProductos = (data) => {
        setShowEditarProductos(true);
    }
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

    if(productos || productos.length >= 0){

        Object.keys(productos).forEach((key, i) => {
            productosToArray[i] = productos[key]
        });
        return (
            <div>
                <Button style={{float:'right'}} onClick={handleShow} variant="primary">
                    <i className="fas fa-tag fa-fw" />
                    Agregar Producto
                </Button>
                <AgregarProducto show={showModal} onHide={() => setShowModal(false)} />
                {
                    showEditarProductos ? <EditarProducto show={showEditarProductos} onHide={() => setShowEditarProductos(false)} product={dataProducto} /> : null
                }    
                <DataTable
                    title="Productos"
                    columns={columns}
                    data={productosToArray}

                />
            </div>

        )
    } else {
        return (
            <h3>Cargando...</h3>
        )
    }
}

export default Productos;