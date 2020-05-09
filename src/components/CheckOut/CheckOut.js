import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Form, Col} from 'react-bootstrap';
import {formatPrice} from '../Data/DataProductos'
import { useOrders } from '../Hooks/useOrders';
import firebase from '../../config/firebase';
const CheckOut = () => {
    const orders = useOrders();
    let cantidadAux = []
    let pedidoFinal = []
    let subTotal = []
    const [userAuth, setUserAuth] = useState();
    const user = firebase.auth().currentUser;
    useEffect(() => {
        if(user) {
            firebase.database().ref(`/Users/${user.uid}`).on('value', snapshot => {
                setUserAuth(snapshot.val());
            });
        }else{
            setUserAuth(false);
        }
    }, []);
    //Agregamos la propiedad "Cantidad" a las ordenes
    orders.state.order.forEach((order, index) => {
        cantidadAux[index] = 1
        orders.state.order[index].cuantity = cantidadAux[index]; 
    })
    const [cantidad, setCantidad] = useState(cantidadAux);

    const handleCantidad = (index,value, max) => {
        let auxArray = [...cantidad];
        auxArray[index] = auxArray[index] + value;
        if(auxArray[index] >= 0 && auxArray[index] <= max){
            setCantidad(auxArray);
        }else if(auxArray[index] < 0){
            auxArray[index] = 0;
            setCantidad(auxArray);
        }else if(auxArray[index] >= max){
            auxArray[index] = max;
            setCantidad(auxArray);
        }
    }
    const removeProduct = index => {
        orders.dispatch({
            type:'REMOVE_ORDER',
            payload:index
        })
    }
    const generarPedido = () => {
        console.log(pedidoFinal)
    }
    const formularioInfoComprador = (info) => {

    }
    if(orders.state.order.length === 0){
        return(
            <div style={{margin:'5% 0 5% 0'}}>
                <h3>Si quieres hacer checkout, debes tener al menos un producto en tu carro de compras...</h3>
                <Link to='/'>
                    <Button variant='danger'><i className="fab fa-fort-awesome fa-2x" />Volver al Inicio</Button>
                </Link>
            </div>
        )
    }
    else{
        console.log(userAuth);
        return(
            <div style={{margin:'5% 2% 5% 2%'}}>
                {
                    userAuth ? 
                        (
                            <>
                            <h2>Información del Cliente</h2>
                            <Form>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Nombre:</Form.Label>
                                            <Form.Control name='name' type="text" placeholder='Ingrese su nombre' defaultValue={userAuth.nombre} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formLastName">
                                            <Form.Label>Apellido:</Form.Label>
                                            <Form.Control name='last_name' type="text" placeholder='Ingrese su apellido' defaultValue={userAuth.apellido} />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="formCell">
                                            <Form.Label>Número:</Form.Label>
                                            <Form.Control name='number' type="text" placeholder='Ingrese su número telefónico' defaultValue={userAuth.numero} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>E-mail:</Form.Label>
                                            <Form.Control name='email' type="text" placeholder='Ingrese su email' defaultValue={userAuth.email} />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="formAddress">
                                            <Form.Label>Dirección:</Form.Label>
                                            <Form.Control name='direccion' type="text" placeholder='Ingrese su dirección' defaultValue={userAuth.direccion} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formComment">
                                            <Form.Label>Comentario:</Form.Label>
                                            <Form.Control name='coment' as="textarea" rows='3' placeholder='Ingrese sus comentarios' defaultValue={userAuth.comentario} />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                            </Form>
                            <br/>
                            </>
                        )
                    :
                        (
                            <>
                            <h4>Cargando información del cliente...</h4>
                            <br/><br/>
                            </>
                        ) 
                 }
                <h2>Su Pedido</h2>
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre:</th>
                            <th>Tipo Producto:</th>
                            <th>Cantidad:</th>
                            <th>Precio:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.state.order.map((producto, index) =>{
                            pedidoFinal[index] = {
                                nombre: producto.title,
                                tipo: producto.description,
                                cantidad: cantidad[index] > 0 ? cantidad[index] : 0,
                                precio_unitario: producto.price,
                                precio_total_producto: producto.price * cantidad[index]
                            }
                            subTotal[index] = producto.price * cantidad[index];
                            return(
                                <tr key={index}>
                                    <td>
                                        <Button variant='secondary' onClick={() => removeProduct(index)}>X</Button>
                                    </td>
                                    <td>{producto.title}</td>
                                    <td>{producto.description}</td>
                                    <td>
                                        <div style={{textAlign:'center', display:'flex'}}>
                                            <h6><Button onClick={() => handleCantidad(index, 1, producto.stock)} style={{marginRight:'5px'}} variant='success'>+</Button></h6>
                                            <input style={{width:'30px'}} type='number' name='producto_cantidad' value={cantidad[index]} readOnly/>
                                            <h6><Button onClick={() => handleCantidad(index, -1, producto.stock)} style={{marginLeft:'5px'}} variant='danger'>-</Button></h6>
                                        </div>
                                    </td>
                                    <td>{formatPrice(producto.price * cantidad[index])}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><h4>Total: </h4></td>
                            <td><h5>{formatPrice(subTotal.reduce((a,b) => a+b))}</h5></td>
                        </tr>
                    </tfoot>
                </Table>
                <Button variant="primary" style={{float:'right'}} onClick={generarPedido}><i className="fas fa-dollar-sign fa-fw" />Ir a Pagar!</Button>
            </div>
        )
    }
}

export default CheckOut;