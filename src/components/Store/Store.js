import React, { useState, useEffect } from 'react';
import { formatPrice } from "../Data/DataProductos";
import { CardDeck, Card, Button, Spinner, Image } from "react-bootstrap";
import firebase from '../../config/firebase';
import './Store.css';

const Store = (props) => {
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
                            <div className="p-3">
                                <CardDeck>
                                    {fbData.map((producto, j) => {
                                        return producto.categoria === categoriaProducto ? (
                                            <div key={j}>
                                                <Card border="light" style={{ width: '18rem' }}>
                                                    <Card.Img src={producto.img} variant="top" />
                                                    <Card.Body>
                                                        <Card.Title>{producto.nombre}</Card.Title>
                                                        <Card.Text>
                                                            {producto.subcategoria}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <small>{formatPrice(producto.precio)}</small>
                                                        <br />
                                                        <Button title="Comprar" variant="dark">
                                                            Agregar
                                                        </Button>
                                                    </Card.Footer>
                                                </Card>
                                            </div>
                                        )
                                            :
                                            null
                                    })}
                                </CardDeck>
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

