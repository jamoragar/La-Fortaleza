import React, {useEffect} from "react";
import './CarritoCompra.scss';

const CarritoCompra = (props) => {
    console.log(props)

    const {openCart, setOpenCart, state } = props
    useEffect(() =>{
        state.order.length === 0 ? setOpenCart(true) : setOpenCart(false)
    }, [state.order.length]);

    return (
        <div className={`container_cart ${openCart ? 'container_opened' : 'container_closed'}`}>
            <div onClick={()=>{setOpenCart(!openCart)}} className={`checklist ${openCart ? 'cart' : 'x'}`}>
                {openCart ? (
                    <div>
                        <img className="shopping-cart" src={require('./bag-icon.png')} alt="La fortaleza!"/>
                        <span className={state.order.length > 0 ? 'bag__quantity' : ''}>{state.order.length > 0 ? state.order.length : null}</span>
                    </div>
                )
                :
                'X'}
            </div>
            {state.order.length === 0 ? (
                <div className='title'>Su carro esta vacío</div>
            )
            :
            (
                <div>
                    <div className='title'>Su pedido: </div>
                    {
                        state.order.map((order, index) => (
                            <div key={index}>
                                <h6>producto: {order.title}</h6>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default CarritoCompra;