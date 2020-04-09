import React, { useState, useEffect } from "react";
import { Image, Spinner } from 'react-bootstrap';
import firebase from "../../../config/firebase";
import { formatPrice } from '../../Data/DataProductos';
import './Articulos.css';

const Preventa = (props) => {
  const [category, setCategory] = useState(null);
  const { fbData, categoriasProductos } = props;
  // LLamado a firebase para obtener todo el nodo Category y poder trabajarlo
  useEffect(() => {
    firebase.database().ref('/Category').on('value', snapshot => {
      setCategory(snapshot.val());
    })
  }, []);

  if (fbData && category) {
    return (
      <div>
        {categoriasProductos.map((categoriaProducto, i) => {
          return categoriaProducto === 'Preventa' ? (
            <div key={i}>
              {/*Transformamos el nodo Category a array, y diferenciamos entre su valor (description) y el subnodo que contiene mas contenido, valga la redundancia...*/}
              {Object.entries(category).map(([abreviacion, contenido], i) => {
                return categoriaProducto === contenido.description ? (
                  <a key={i} href={contenido.path}>
                    <Image
                      key={i}
                      className="img-banner"
                      title="Preventa"
                      src={contenido.banner}
                      fluid
                    />
                  </a>
                ) : null
              })}
              <div className="card_container">
                <div className="row">
                  {fbData.map((producto, j) => {
                    return producto.categoria === categoriaProducto ? (
                      <div key={j} className="col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3">
                        <div className="card">
                          <img className="card-img" src={producto.img} alt={producto.nombre} width='300' height='350' />
                          <div className="card-body">
                            <h4 className="card-title">{producto.nombre}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">{producto.subcategoria}</h6>
                            <p className="card-text">{producto.descripcion}</p>
                            <div className="buy d-flex justify-content-between align-items-center">
                              <div className="price text-success">
                                <h5 className="mt-4">
                                  {formatPrice(producto.precio)}
                                </h5>
                              </div>
                              <a href="/" className="btn btn-danger mt-3"><i className="fas fa-shopping-cart"></i> Comprar</a>
                            </div>
                          </div>
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

export default Preventa;