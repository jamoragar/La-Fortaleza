import React , {useState, useEffect} from 'react';
import firebase from '../../../../config/firebase';
import {OverlayTrigger, Tooltip, Button} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
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
            cell: () => {return(
                            <>
                            <OverlayTrigger key={'ver'} placement={'bottom'}
                                overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Ver</strong></Tooltip>
                                }
                            >
                                <a href='#' className="text-success"><i className="fas fa-fw fa-search" /> </a> 
                            </OverlayTrigger>
                            <OverlayTrigger key={'editar'} placement={'bottom'} 
                                overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Editar</strong></Tooltip>
                                }
                            >
                                <a href='#' className="text-primary"><i className="fa fa-fw fa-edit" /> </a> 
                            </OverlayTrigger>
                            <OverlayTrigger key={'eliminar'} placement={'bottom'}
                                overlay={
                                <Tooltip id={`tooltip-bottom`}><strong>Eliminar</strong></Tooltip>
                                }
                            >
                                <a href='#' className="text-danger"><i className="fa fa-fw fa-trash" /></a>
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
    
    if(productos){
        Object.keys(productos).map((key, i) => {
            productosToArray[i] = productos[key]
        });
        console.log(productosToArray)
        return (
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
        )
    }else{
        return(
            <h3>Cargando...</h3>
        )
    }
}

export default Productos;