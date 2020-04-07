import React, { useState } from 'react';
import styled from 'styled-components';
import './ShopingCart.css';

const OrderStyled = styled.div`
    position: fixed;
    right: 0px;
    top: 0px;
    width: 340px;
    background-color: white;
    height: calc(100% - 0px);
    z-index: 1000;
    box-shadow: 4px 0px 5px 4px grey;
    display: flex;
    flex-direction: column;
    transition: 0.4s;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    @media (max-width:480px){
        width:100%;
    }
`;

const OrderContent = styled.div`
    padding: 20px;
    height: 100%;
    @media (max-width:480px){
        padding: 45px;
    }
`;

const DialogFooter = styled.div`
    box-shadow: 0px -2px 20px 0px grey;
    height: 60px;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
`;

const ConfirmButton = styled.div`
    margin: 10px;
    color: black;
    height: 40px;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    width: 250px;
    cursor: pointer;
    background-color: #28a745;
    ${({ disabled }) =>
        disabled &&
        `
        opacity: .5;
        background-color: grey;
        pointer-events: none;
        `}
`;

export default function ShoppingCart(props) {
    const { addCart } = props;
    const [closeCart, setCloseCart] = useState(true);

    return (
        <OrderStyled open={!closeCart} >
            <div onClick={() => { setCloseCart(!closeCart) }} className={`close_checkout ${!closeCart ? 'x' : 'cart'}`} >

            </div>
            <OrderContent>{addCart}</OrderContent>
            <DialogFooter>
                <ConfirmButton >
                    Pagar!
                </ConfirmButton>
            </DialogFooter>
        </OrderStyled>
    );
}