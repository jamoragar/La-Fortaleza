import React, { useState, useEffect } from 'react';
import { formatPrice } from "../Data/DataProductos";
import { Spinner, Image, Button } from "react-bootstrap";
import firebase from '../../config/firebase';
import './Store.scss';

import {useOrders} from '../Hooks/useOrders';

const Store = ({ fbData, categoriasProductos }) => {
    const [category, setCategory] = useState(null);
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
            title:product.nombre,
            description:product.categoria,
            price:product.precio
        }
        orders.dispatch({
            type: 'ADD_ORDER',
            payload: newOrder
        })
    }

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
                                            className="img-banner"
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
                                            <div key={j} className="col-12 col-sm-12 col-md-6 col-lg-3 p-3" >
                                                <div className="card">
                                                    <img className="card-img" src={producto.img} alt={producto.nombre} width='300' height='350' />
                                                    <div className="card-body">
                                                        <h4 className="card-title">{producto.nombre}</h4>
                                                        <h6 className="card-subtitle mb-2 text-muted">{producto.subcategoria}</h6>
                                                        <p className="card-text">{producto.descripcion}</p>
                                                        <div className="buy d-flex justify-content-between align-items-center">
                                                            <div className="row">
                                                                <div className="col-4">
                                                                    <div className="price text-success">
                                                                        <h5 className="mt-4">
                                                                            {formatPrice(producto.precio)}
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <a href={`/Articulo/${producto.id}`}>
                                                                        <button
                                                                            className="btn btn-success mt-3 "
                                                                        >
                                                                            <i className="fas fa-eye" />
                                                                            Ver
                                                                        </button>
                                                                    </a>
                                                                </div>
                                                                <div className="col-5">
                                                                    <Button
                                                                        className='mt-3'
                                                                        variant='danger'
                                                                        onClick={() => addNewProduct(producto)}>
                                                                        <i className="fas fa-shopping-cart" />
                                                                        Comprar
                                                                    </Button>
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

