import React , {useState, useEffect} from 'react';
import firebase from '../../../../config/firebase';
import {Table, Button} from 'react-bootstrap';
import AgregarProducto from './AgregarProducto';

const Productos = () => {
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
        })
        console.log(productosToArray)
        return (
            <div>
                <Button style={{float:'right'}} onClick={handleShow} variant="primary">
                    <i className="fas fa-tag fa-fw" />
                    Agregar Producto
                </Button>
                <AgregarProducto show={showModal} onHide={() => setShowModal(false)} />
                <br/><br/><br/>
                <Table responsive>
                    <thead>
                        <tr>
                        <th>#</th>
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
                                return(
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td><img src={producto.img[0]} width='80' alt="..."/></td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.categoria}</td>
                                        <td>
                                            <a href='#' className="text-success"><i className="fas fa-fw fa-search" /> </a> 
                                            <a href='#' className="text-primary"><i className="fa fa-fw fa-edit" /> </a> 
                                            <a href='#' className="text-danger"><i className="fa fa-fw fa-trash" /></a>
                                        </td>   
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }else{
        return(
            <h3>Cargando...</h3>
        )
    }
}

export default Productos;