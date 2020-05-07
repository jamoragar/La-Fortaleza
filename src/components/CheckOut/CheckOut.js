import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Table, Button} from 'react-bootstrap';
import {formatPrice} from '../Data/DataProductos'
import { useOrders } from '../Hooks/useOrders';

const CheckOut = () => {
    const orders = useOrders();
    let cantidadAux = []
    let pedidoFinal = []
    let subTotal = []
    //Agregamos la propiedad "Cantidad" a las ordenes
    orders.state.order.map((order, index) => {
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
    if(orders.state.order.length == 0){
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
        return(
            <div style={{margin:'5% 2% 5% 2%'}}>
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