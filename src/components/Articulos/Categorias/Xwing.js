import React, { useState, useEffect } from "react";
import { Spinner } from 'react-bootstrap';
import firebase from "../../../config/firebase";
import { formatPrice } from '../../Data/DataProductos';

import { useOrders } from '../../Hooks/useOrders';

const Accesorios = (props) => {
  const [category, setCategory] = useState(null);
  const { fbData, categoriasProductos } = props;
  const orders = useOrders();
  // LLamado a firebase para obtener todo el nodo Category y poder trabajarlo
  useEffect(() => {
    firebase.database().ref('/Category').on('value', snapshot => {
      setCategory(snapshot.val());
    })
  }, []);

  const addNewProduct = (product) => {
    console.log(product)
    const newOrder = {
      title: product.nombre,
      description: product.categoria,
      price: product.precio
    }
    orders.dispatch({
      type: 'ADD_ORDER',
      payload: newOrder
    })
  }

  const discountPrice = 0.10;

  if (fbData && category) {
    return (
      <div>
        {categoriasProductos.map((categoriaProducto, i) => {
          return categoriaProducto === 'X-Wing' ? (
            <div key={i}>
              {/*Transformamos el nodo Category a array, y diferenciamos entre su valor (description) y el subnodo que contiene mas contenido, valga la redundancia...*/}
              {Object.entries(category).map(([abreviacion, contenido], i) => {
                return categoriaProducto === contenido.description ? (
                  <a key={i} href={contenido.path}>
                    <img
                      alt="Banner"
                      className="img-fluid"
                      key={i}
                      title="X-Wing"
                      src={contenido.banner}
                    />
                  </a>
                ) : null
              })}
              <div className="card-group" >
                <div className="row">
                  {fbData.map((producto, j) => {
                    return producto.categoria === categoriaProducto ? (
                      <div key={j} className="col p-3" >
                        <div className="card" style={{ width: "285px" }}>
                          <div className="offer offer-success">
                            <div className="shape">
                              <div className="shape-text">
                                -10%
					                                        </div>
                            </div>
                            <img className="card-img" src={producto.img} alt={producto.nombre} style={{ width: "283px", height: "283px" }} />
                          </div>
                          <div className="card-header-store text-center">
                            <h5 className="card-title-style">{producto.nombre}</h5>
                          </div>
                          <div className="card-body-style">
                            <p className="card-text" >{producto.descripcion}</p>
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <h6 className="card-subtitle mb-2 text-muted">{producto.subcategoria}</h6>
                            </li>
                            <li className="list-group-item">
                              <div className="row mt-1">
                                <div className="col-6 text-center">
                                  <h5 className="text-success">
                                    {formatPrice(producto.precio - (producto.precio * discountPrice))}
                                  </h5>
                                </div>
                                <div className="col-6 text-center">
                                  <h5 className="text-muted">
                                    <s>{formatPrice(producto.precio)}</s>
                                  </h5>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row mt-1">
                                <div className="col-6">
                                  <button
                                    style={{ outline: "none" }}
                                    className='btn-add btn-danger'
                                    onClick={() => addNewProduct(producto)}>
                                    <i className="fas fa-shopping-cart" />
                                      Comprar
                                  </button>
                                </div>
                                <div className="col-6 pl-1">
                                  <a href={`/Articulo/${producto.id}`}>
                                    <button
                                      style={{ outline: "none" }}
                                      className="btn-ver btn-success"
                                    >
                                      <i className="fas fa-eye" />
                                        Ver
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )
                      :
                      null
                  })}
                </div>
              </div>
            </div>
          ) : null
        })
        }
      </div>
    )
  } else {
    return (
      <div>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </div>
    )
  }
}

export default Accesorios;