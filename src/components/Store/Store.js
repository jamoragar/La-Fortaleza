import React, { useState, useEffect } from 'react';
import { formatPrice } from "../Data/DataProductos";
import { Spinner, Image } from "react-bootstrap";
import firebase from '../../config/firebase';
import './Store.css';

const Store = ({ fbData, categoriasProductos, setArticulo, setAddCart }) => {
    const [category, setCategory] = useState(null);
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
                    return (
                        <div key={i}>
                            {/*Transformamos el nodo Category a array, y diferenciamos entre su valor (description) y el subnodo que contiene mas contenido, valga la redundancia...*/}
                            {Object.entries(category).map(([abreviacion, contenido], i) => {
                                return categoriaProducto === contenido.description ? (
                                    <a key={i} href={contenido.path}>
                                        <Image
                                            key={i}
                                            className="p-3"
                                            title="Modelos a Escala"
                                            src={contenido.banner}
                                            fluid
                                        />
                                    </a>
                                ) : null
                            })}
                            <div className="card_container" >
                                <div className="row">
                                    {fbData.map((producto, j) => {
                                        return producto.categoria === categoriaProducto ? (
                                            <div key={j} className="col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3" >
                                                <div className="card">
                                                    <img className="card-img" src={producto.img} alt={producto.nombre} width='300' height='350' />
                                                    <div className="card-body">
                                                        <h4 className="card-title">{producto.nombre}</h4>
                                                        <h6 className="card-subtitle mb-2 text-muted">{producto.subcategoria}</h6>
                                                        <p className="card-text">{producto.descripcion}</p>
                                                        <div className="buy d-flex justify-content-between align-items-center">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col ">
                                                                        <div className="price text-success">
                                                                            <h5 className="mt-4">
                                                                                {formatPrice(producto.precio)}
                                                                            </h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <a
                                                                            href="/Articulo"
                                                                            className="btn btn-success mt-3 "
                                                                            onClick={() => {
                                                                                setArticulo(producto.nombre)
                                                                            }}
                                                                        >
                                                                            <i className="fas fa-eye"></i>
                                                                        Ver
                                                                    </a>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <div
                                                                            className="btn btn-danger mt-3 "
                                                                            onClick={() => {
                                                                                setAddCart(producto.nombre)
                                                                            }}>
                                                                            <i className="fas fa-shopping-cart"></i>
                                                                        Comprar
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </div>
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
                    )
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

export default Store;

