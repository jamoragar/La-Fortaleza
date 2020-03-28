import React, { useState, useEffect } from 'react';
import firebase from '../../../../config/firebase';
<<<<<<< HEAD
import { Table, Button } from 'react-bootstrap';
=======
import {OverlayTrigger, Tooltip, Button} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
>>>>>>> 57ce85b34f2eae42d17a3749a693913fb367ed7a
import AgregarProducto from './AgregarProducto';
const Productos = () => {
    const columns = [
        {
          name: 'Foto',
          grow: 1,
          cell: row => <img src={row.img[0]} width='75' alt="..."/>
        },
        {
          name: 'Nombre',
          selector: 'nombre',
          sortable: true,
          grow: 1
        },
        {
            name:'Categoría',
            selector: 'categoria',
            sortable: true,
            grow: 2
        },
        {
            name:'Precio',
            sortable: true,
            cell: row => `$ ${row.precio}`
        },
        {
            name:'Stock',
            selector: 'stock',
            sortable: true
        },
        {
            name:'Control',
            button:true,
            cell: (data) => {return(
                            <>
                            <OverlayTrigger key={'ver'} placement={'left'}
                                overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Ver</strong></Tooltip>
                                }
                            >
                                <div style={{cursor:'pointer'}} className="text-success"><i className="fas fa-fw fa-search fa-lg" style={{width:'35px',height:'20px'}}/> </div> 
                            </OverlayTrigger>
                            <OverlayTrigger key={'editar'} placement={'left'} 
                                overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Editar</strong></Tooltip>
                                }
                            >
                                <div style={{cursor:'pointer'}} className="text-primary"><i className="fa fa-fw fa-edit fa-lg" style={{width:'35px',height:'20px'}}/> </div> 
                            </OverlayTrigger>
                            <OverlayTrigger key={'eliminar'} placement={'left'}
                                overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Eliminar</strong></Tooltip>
                                }
                            >
                                <div style={{cursor:'pointer'}} onClick={()=>deleteProduct(data)} className="text-danger"><i className="fa fa-fw fa-trash fa-lg" style={{height:'20px'}}/></div>
                            </OverlayTrigger>
                            </>
                        )
            }
        }
      ];
    const [showModal, setShowModal] = useState(false);
    const [productos, setProductos] = useState(null)
    const handleShow = () => setShowModal(true);
    let productosToArray = [];
    useEffect(() => {
        firebase.database().ref('/Productos').on('value', snapshot => {
            setProductos(snapshot.val());
        });
    }, []);

<<<<<<< HEAD
    if (productos) {
=======
    const deleteProduct = (product) => {
        const ref = firebase.storage().ref(`/IMG/Productos/${product.nombre}`);
        firebase.database().ref(`/Productos/${product.id}`).remove().then(() =>{
            ref.listAll().then((dir) =>{
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
    
    if(productos){
>>>>>>> 57ce85b34f2eae42d17a3749a693913fb367ed7a
        Object.keys(productos).map((key, i) => {
            productosToArray[i] = productos[key]
        });
        return (
<<<<<<< HEAD
            <div>
                <Button style={{ float: 'right' }} onClick={handleShow} variant="primary">
                    <i className="fas fa-tag fa-fw" />
                    Agregar Producto
                </Button>
                <AgregarProducto show={showModal} onHide={() => setShowModal(false)} />
                <br /><br /><br />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>/</th>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productosToArray.map((producto, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td><img src={producto.img[0]} width='80' alt="..." /></td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.categoria}</td>
                                        <td>
                                            <a href='/' className="text-success"><i className="fas fa-fw fa-search" /> </a>
                                            <a href='/' className="text-primary"><i className="fa fa-fw fa-edit" /> </a>
                                            <a href='/' className="text-danger"><i className="fa fa-fw fa-trash" /></a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
=======
            <>
            <Button style={{float:'right'}} onClick={handleShow} variant="primary">
                <i className="fas fa-tag fa-fw" />
                Agregar Producto
            </Button>
            <AgregarProducto show={showModal} onHide={() => setShowModal(false)} />
            <DataTable
                title="Productos"
                columns={columns}
                data={productosToArray}
                fixedHeader
                fixedHeaderScrollHeight="300px"
            />
            </>
>>>>>>> 57ce85b34f2eae42d17a3749a693913fb367ed7a
        )
    } else {
        return (
            <h3>Cargando...</h3>
        )
    }
}

export default Productos;