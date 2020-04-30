import React, { useEffect, useState } from "react";
import { formatPrice } from '../Data/DataProductos';
import Register from '../Register/Register';
import './CarritoCompra.scss';

const CarritoCompra = (props) => {
    const { authenticated, openCart, setOpenCart, state } = props;
    const [modalRegisterShow, setModalRegisterShow] = useState(false);

    useEffect(() => {
        state.order.length === 0 ? setOpenCart(true) : setOpenCart(false)
    }, [state.order.length]);

    const discountPrice = 0.10;

    const orders = state.order;
    let precios = [];

    Object.keys(orders).forEach((key, i) => {
        precios[i] = parseInt(orders[key].price);
    });

    const subTotal = (precios != 0) ? (precios.reduce((a, b) => a + b)) : 0;
    const total = subTotal - (subTotal * discountPrice);

    /*
    const [newOrders, setNewOrders] = useState([...orders]);

    const deleteOrder = (order) => {
        const newOrders = [...orders]
        newOrders.splice(order, 1);
        setNewOrders(newOrders);
    }
    */

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
                                        onClick={() => {
                                            setOpenCart({ ...order, index })
                                        }}
                                    >
                                        <div>1</div>
                                        <div>{order.title}</div>
                                        <div
                                            key={index + order}
                                            style={{ cursor: 'pointer' }}
                                            onClick={e => {
                                                e.stopPropagation();
                                                //deleteOrder(order);
                                                setOpenCart(false);
                                            }}>
                                            <span role="img" aria-label="Delete">
                                                🗑️
                                    </span>
                                        </div>
                                        <div>{formatPrice(order.price - (order.price * discountPrice))}</div>
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
                    else {
                        console.log("pagando")
                    }
                }}>
                    Pagar!
                </div>
            </div>
        </div >
    )
}

export default CarritoCompra;