import React, { useState, useEffect } from "react";
import { Image, Spinner } from 'react-bootstrap';
import firebase from "../../../config/firebase";
import { formatPrice } from '../../Data/DataProductos';


const XWing = (props) => {
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
          return categoriaProducto === 'X-Wing' ? (
            <div key={i}>
              {/*Transformamos el nodo Category a array, y diferenciamos entre su valor (description) y el subnodo que contiene mas contenido, valga la redundancia...*/}
              {Object.entries(category).map(([abreviacion, contenido], i) => {
                return categoriaProducto === contenido.description ? (
                  <a key={i} href={contenido.path}>
                    <Image
                      key={i}
                      className="img-banner"
                      title="X-Wings"
                      src={contenido.banner}
                      fluid
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
                          <img className="card-img" src={producto.img} alt={producto.nombre} style={{ width: "283px", height: "283px" }} />
                          <div className="card-header-store text-center">
                            <h5 className="card-title">{producto.nombre}</h5>
                          </div>
                          <div className="card-body mt-2">
                            <p className="card-text" >{producto.descripcion}</p>
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <h5>
                                {producto.categoria}
                              </h5>
                            </li>
                            <li className="list-group-item">
                              <h6 className="card-subtitle mb-2 text-muted">{producto.subcategoria}</h6>
                            </li>
                            <li className="list-group-item">
                              <div className="row mt-1">
                                <div className="col-6 text-center">
                                  <h5 className="text-success">
                                    {formatPrice(producto.precio)}
                                  </h5>
                                </div>
                                <div className="col-6 text-center">
                                  <h5>
                                    Stock: {producto.stock}
                                  </h5>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row mt-1">
                                <div className="col-6">
                                  <button className='btn-add btn-danger' onClick={() => { }}>
                                    <i className="fas fa-shopping-cart" />
                                      Comprar
                                  </button>
                                </div>
                                <div className="col-6 pl-1">
                                  <a href={`/Articulo/`}>
                                    <button className="btn-ver btn-success">
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

export default XWing;