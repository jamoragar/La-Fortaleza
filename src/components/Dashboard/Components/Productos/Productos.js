import React, { useState, useEffect, useMemo } from 'react';
import firebase from '../../../../config/firebase';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import AgregarProducto from './AgregarProducto';
import EditarProducto from './EditarProducto';
import productosStyles from './Productos.module.scss'
 
const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <input className={productosStyles.TextField} id="search" type="text" placeholder="Buscar por nombre" value={filterText} onChange={onFilter} />
      <button className={productosStyles.ClearButton} type="button" onClick={onClear}>X</button>
    </>
  );

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
                    <div>
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
                            <div style={{ cursor: 'pointer' }} className="text-primary"><i className="fa fa-fw fa-edit fa-lg" style={{ width: '35px', height: '20px' }} onClick={handleShowEditarProductos} /></div>
                        </OverlayTrigger>
                        <OverlayTrigger key={'eliminar'} placement={'left'}
                            overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Eliminar</strong></Tooltip>
                                }
                            >
                                <div style={{cursor:'pointer'}} onClick={()=>deleteProduct(data)} className="text-danger"><i className="fa fa-fw fa-trash fa-lg" style={{height:'20px'}}/></div>
                            </OverlayTrigger>
                        </div>
                        {
                            showEditarProductos ? (
                                <EditarProducto style={{background:'none'}} show={showEditarProductos} onHide={() => setShowEditarProductos(false)} product={data} />
                            )
                            :
                            null
                        }
                    </div>
                        )
                    },

        }
    ];

    
    const [showModal, setShowModal] = useState(false);
    const [showEditarProductos, setShowEditarProductos] = useState(false)
    const [productos, setProductos] = useState([])
    //Buscador
   
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
          }
        };
        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);
    //Fin buscador...
    const handleShow = () => setShowModal(true);
    const handleShowEditarProductos = (data) => setShowEditarProductos(true);
    let productosToArray = [];
    useEffect(() => {
        firebase.database().ref('/Productos').on('value', snapshot => {
            if(snapshot.val()){setProductos(snapshot.val());}
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

    if(productos || productos.length >= 0){

        Object.keys(productos).forEach((key, i) => {
            productosToArray[i] = productos[key]
        });
        const filteredItems = productosToArray.filter(item => item.nombre.toLowerCase() && item.nombre.toLowerCase().includes(filterText.toLowerCase()));
        return (
            <div>
                <Button style={{float:'right'}} onClick={handleShow} variant="primary">
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
            <h3>Cargando...</h3>
        )
    }
}

export default Productos;