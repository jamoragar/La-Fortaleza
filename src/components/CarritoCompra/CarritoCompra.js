import React, { useEffect } from "react";
import { formatPrice } from '../Data/DataProductos';
import './CarritoCompra.scss';

const CarritoCompra = (props) => {
    const { openCart, setOpenCart, state } = props
    useEffect(() => {
        state.order.length === 0 ? setOpenCart(true) : setOpenCart(false)
    }, [state.order.length]);

    console.log(state.order.price);

    return (
        <div className={`container_cart ${openCart ? 'container_opened' : 'container_closed'}`} >
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
                <div className='title'>Su carro esta vacío</div>
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
                                            style={{ cursor: 'pointer' }}
                                            onClick={e => {
                                                e.stopPropagation();
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
                        <div className={`order_container`}>
                            <div className={`order_item`}>
                                <div />
                                <div>Total: </div>
                                <div>aca va el total</div>
                            </div>
                        </div>
                    </div>
                )}
            <div className={`order_footer`}>
                <div className={`btn_pago`}>
                    Pagar!
                </div>
            </div>
        </div>
    )
}

export default CarritoCompra;