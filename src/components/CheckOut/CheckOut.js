import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Form, Col} from 'react-bootstrap';
import {formatPrice} from '../Data/DataProductos'
import { useOrders } from '../Hooks/useOrders';
import firebase from '../../config/firebase';
import PagoEnLinea, {ProductosLaFortaleza} from '../PagoEnLinea/PagoEnLinea';
import moment from 'moment-timezone';
import timezone from '../PagoEnLinea/timezone.json';


const CheckOut = () => {
    let total = 0;
    let cantidadAux = []
    let pedidoFinal = []
    let subTotal = []
    const orders = useOrders();
    const [disableButton, setDisableButton] = useState(false);
    const [precio_envio, setPrecio_envio] = useState(0);
    const [precio_regalo, setPrecio_regalo] = useState(0);
    const [userAuth, setUserAuth] = useState();
    const [regalo, setRegalo] = useState(false);
    const [envioGratuito, setEnvioGratuito] = useState(false);
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
        if(auxArray[index] >= 1 && auxArray[index] <= max){
            setCantidad(auxArray);
        }else if(auxArray[index] < 0){
            auxArray[index] = 1;
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
    const checkeaExtras = () => {
        if(regalo){
            pedidoFinal[pedidoFinal.length] = {
                id: 'envueltoRegalo',
                nombre: 'Envuelto para Regalo',
                tipo: 'Extras',
                cantidad: 1,
                precio_unitario: precio_regalo,
                precio_total_producto: precio_regalo
            };
        }
        if(envioGratuito){
            pedidoFinal[pedidoFinal.length] = {
                id: 'envioGratuito',
                nombre: 'Envío',
                tipo: 'Extras',
                cantidad: 1,
                precio_unitario: precio_envio,
                precio_total_producto: precio_envio
            };
        }     
    }

    if(total > 30001){
        setEnvioGratuito(true)
    }

    const generarPedido = (e) => {
        e.preventDefault();
        setDisableButton(true);
        moment.tz.add(timezone.Punta_Arenas);// Establecemos zona horaria
        checkeaExtras();// Verificamos si hay o no envio gratuito y envoltorio de regalo
        const tokenPedido = firebase.database().ref(`/Users/${user.uid}`).child('pedidos').push().key; //generamos una id unica para nuestro nodo, que a la vez usaremos como control interno
        //Generamos el pedido del usuario
        const pedidoUsuario = {
            id_interno: tokenPedido,
            items: ProductosLaFortaleza(pedidoFinal),
            precio_total: total,
            estado_pago: 'PENDIENTE',
            fecha_validacion_pago: '',
            regalo: regalo,
            numero_orden: 'PENDIENTE',
            delivery: total >= 30000 ? true:false,
            estado_pedido: 1,//Distintos estados comenzando en 1 a N, donde cada numero indica un paso distinto.
            fecha_creacion_pedido: moment().tz('America/Punta_Arenas').format('YYYY-MM-DD HH:mm')
        }
        const {name, last_name, email, number, direccion, coment} = e.target.elements;
        const informacionCliente = {
            id_cliente: userAuth.uid,
            nombre: name.value,
            apellido: last_name.value,
            email: email.value,
            numero: number.value,
            direccion: direccion.value,
            comentario: coment.value
        }
        //Escribimos en la BD el pedido y hacemos una promesa una vez escrito que mande a pagar por mercadopago
        let updates = {};
        updates['/pedidos/' + tokenPedido] = pedidoUsuario;
        
        return firebase.database().ref(`/Pedidos/${tokenPedido}/`).set({
            pedidoUsuario,
            informacionCliente: informacionCliente
        }).then(
            firebase.database().ref(`/Users/${user.uid}`).update(updates).then(PagoEnLinea(pedidoFinal, userAuth, tokenPedido))
        );
    }
    const handleRegalo = () => {        
        setRegalo(!regalo);
        if(!regalo){
            setPrecio_regalo(2000)
        }
        else{
            setPrecio_regalo(0)
        }
    }
    const handleEnvio = () => {
        setEnvioGratuito(!envioGratuito);
        if(!envioGratuito) {
            setPrecio_envio(2500)
        }
        else{
            setPrecio_envio(0)
        }

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
        if(total >= 30001){
            console.log('entramos');
            setEnvioGratuito(true);
            setPrecio_envio(0);
        }
        return(
            <div style={{margin:'5% 2% 20% 2%'}}>
                <Form onSubmit={generarPedido}>
                {
                    userAuth ? 
                        (
                            <>
                            <h2>Información del Cliente</h2>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Nombre:</Form.Label>
                                            <Form.Control name='name' type="text" placeholder='Ingrese su nombre' defaultValue={userAuth.nombre}  required/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formLastName">
                                            <Form.Label>Apellido:</Form.Label>
                                            <Form.Control name='last_name' type="text" placeholder='Ingrese su apellido' defaultValue={userAuth.apellido}  required/>
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
                                            <Form.Control name='email' type="text" placeholder='Ingrese su email' defaultValue={userAuth.email}  required/>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="formAddress">
                                            <Form.Label>Dirección:</Form.Label>
                                            <Form.Control name='direccion' type="text" placeholder='Ingrese su dirección' defaultValue={userAuth.direccion}  required/>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Group controlId="formComment">
                                    <Form.Label>Comentario:</Form.Label>
                                    <Form.Control name='coment' as="textarea" rows='3' placeholder='Ingrese sus comentarios' defaultValue={userAuth.comentario} />
                                </Form.Group>
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
                <br/>
                ¿Desea envolver su pedido para regalo?<br/>
                (Tiene un costo adicional de $2.000)<br/>
                <i className="fas fa-gifts mr-3 fa-2x" />
                <Form.Check
                    inline
                    checked={regalo}
                    name={'control'}
                    type={'radio'}
                    id={`custom1`}
                    label={`Si`}
                    onChange={handleRegalo}
                />
                <Form.Check
                    inline
                    checked={!regalo}
                    name={'control'}
                    type={'radio'}
                    id={`custom2`}
                    label={`No`}
                    onChange={handleRegalo}
                />
                <br/><br/>
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
                                id: producto.id,
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
                                            <h6><Button onClick={() => handleCantidad(index, -1, producto.stock)} style={{marginRight:'8px'}} variant='danger'>-</Button></h6>
                                            <input style={{width:'30px'}} type='number' name='producto_cantidad' value={cantidad[index]} readOnly/>
                                            <h6><Button onClick={() => handleCantidad(index, 1, producto.stock)} style={{marginLeft:'8px'}} variant='success'>+</Button></h6>
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
                            <td>
                                <h5>
                                    {(() => {   
                                            total = subTotal.reduce((a,b) => a+b) + precio_envio + precio_regalo
                                            if(total >= 30001) {
                                                total = total - precio_envio
                                            }
                                            return(
                                                formatPrice(total)
                                            )
                                        }
                                    )()}
                                </h5>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
                {
                    total >= 30001 ? (
                        <>
                            <h4>Tiene envio gratuito a su dirección!</h4>
                            En <b>area rural</b> le recomendamos comunicarse al número de contacto La Fortaleza (61) 237 1498 dentro del horario de atención, para confirmar el valor de este.<br/>
                        </>
                        ) : (
                        <>
                        <h4>¿Desea servicio de reparto?</h4>
                        El valor del envio es de $2.500 en <b>area urbana.</b><br/>
                        En <b>area rural</b> le recomendamos comunicarse al número de contacto La Fortaleza (61) 237 1498 dentro del horario de atención, para confirmar el valor de este.<br/>
                        <i className="fas fa-shipping-fast mr-3 fa-2x" />
                        <Form.Check
                            inline
                            checked={envioGratuito}
                            name={'envio'}
                            type={'radio'}
                            id={`custom3`}
                            label={`Si`}
                            onChange={handleEnvio}
                        />
                        <Form.Check
                            inline
                            checked={!envioGratuito}
                            name={'envio'}
                            type={'radio'}
                            id={`custom4`}
                            label={`No, retiraré mi pedido en la tienda.`}
                            onChange={handleEnvio}
                        />
                        </>
                    )
                }
                    <Button variant="primary" style={{float:'right'}} type='submit' disabled={disableButton}><i className="fas fa-dollar-sign fa-fw" />Ir a Pagar!</Button>
                </Form>
            </div>
        )
    }
}

export default CheckOut;