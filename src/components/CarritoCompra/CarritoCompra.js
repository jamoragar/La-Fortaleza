import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
//Componetes
import Register from '../Register/Register';
//Hooks
import { formatPrice } from '../Data/DataProductos';
//Styles
import './CarritoCompra.scss';

const CarritoCompra = (props) => {
    const { authenticated, openCart, setOpenCart, state, dispatch } = props;
    const [modalRegisterShow, setModalRegisterShow] = useState(false);

    useEffect(() => {
        state.order.length === 0 ? setOpenCart(true) : setOpenCart(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.order.length]);

    const discountPrice = 0.10;

    const orders = state.order;
    let precios = [];

    Object.keys(orders).forEach((key, i) => {
        precios[i] = parseInt(orders[key].price);
    });

    const subTotal = (precios != 0) ? (precios.reduce((a, b) => a + b)) : 0;
    const total = subTotal;

    const removeProduct = productIndex => {
        dispatch({
            type: 'REMOVE_ORDER',
            payload: productIndex
        })
    }

    return (
        <div className={`container_cart ${openCart ? 'container_opened' : 'container_closed'}`} >
            <Register show={modalRegisterShow} onHide={() => setModalRegisterShow(false)} />
            <div onClick={() => { setOpenCart(!openCart) }} className={`checklist ${openCart ? 'cart' : 'x'}`}>
                {openCart ? (
                    <div>
                        <img className="shopping-cart" src={require('./bag-icon.png')} alt="La fortaleza!" />
                        <span className={state.order.length > 0 ? 'bag__quantity' : ''}>{state.order.length > 0 ? state.order.length : null}</span>
                    </div>
                ) : 'X'
                }
            </div>
            {state.order.length === 0 ? (
                <div className={`order_content`}>Su carro esta vacío</div>
            ) : (
                    <div className={`order_content`} style={{ overflowY: "scroll" }} >
                        {" "}
                        <div className={`order_cont`}> Tu Pedido: </div>
                        {
                            state.order.map((order, index) => (
                                <div className={`order_container`} key={index} >
                                    <div
                                        className={`order_item`}
                                        key={index + order}
                                    >
                                        <div>1</div>
                                        <div>{order.title}</div>
                                        <div
                                            title='Eliminar'
                                            key={index + order}
                                            style={{ cursor: 'pointer' }}
                                            onClick={e => {
                                                e.stopPropagation();
                                                removeProduct(index);
                                            }}>
                                            <span role="img" aria-label="Delete">
                                                🗑️
                                            </span>
                                        </div>
                                        <div>{formatPrice(order.price)}</div>
                                    </div>
                                    <div className={`detail_item`}>
                                        {order.description}
                                    </div>
                                </div>
                            ))}
                        <div className={`order_total`}>
                            <div />
                            <div>Total: </div>
                            <div />
                            <div >{formatPrice(total)}</div>
                        </div>
                    </div>
                )}
            <div className={`order_footer`}>
                <div className={`btn_pago`} onClick={() => {
                    if (state.order.length >= 0 && !authenticated) {
                        setModalRegisterShow(true);
                    }
                }}>
                    {state.order.length >= 0 && !authenticated ? 'Registrate para continuar!' : (<Link style={{ pointer: 'cursor', decoration: 'none', color: 'white' }} to='/CheckOut'>Ver Carrito!</Link>)}
                </div>
            </div>
        </div>
    )
}

export default CarritoCompra;