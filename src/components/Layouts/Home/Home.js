import React, { useState, useEffect } from "react";
//Api
import CarouselContainer from "../Carousel/Carousel";
import { Spinner } from 'react-bootstrap';
//Componentes
import Store from "../../Store/Store";
import TableInfo from "../TableInfo/TableInfo";
import CarritoCompra from '../../CarritoCompra/CarritoCompra';
//Hooks
import { useOrders } from '../../Hooks/useOrders';
import { useCart } from '../../Hooks/useCart';

const Home = (props) => {
  const { fbData, category, categoriaProductos } = props;
  const orders = useOrders();
  const cart = useCart();

  if (fbData) {

    return (
      <div className="container-fluid">
        <CarritoCompra {...orders} {...cart} authenticated={props.isAuthed} uid={props.uid} />
        <CarouselContainer />
        <TableInfo />
        <Store fbData={fbData} category={category} categoriaProductos={categoriaProductos} orders={orders} cart={cart} />
      </div>
    );
  }
  else {
    return (
      <>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </>
    )
  }
}

export default Home;
