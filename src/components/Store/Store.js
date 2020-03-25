import React from 'react';
import { productos } from "../Data/DataProductos";
import { formatPrice } from "../Data/DataProductos";
import { Card, CardDeck, Button } from "react-bootstrap";

import './Store.css';

export default function Store(props) {
    return (
        <div>
            {Object.entries(productos).map(([categoriaName, productos]) => (
                <div>
                    <h1 className="p-3">{categoriaName}</h1>
                    <CardDeck className="p-3" fluid>
                        {productos.map(producto => (
                            <Card>
                                <Card.Img src={producto.img} variant="top" />
                                <Card.Body>
                                    <Card.Title>{producto.name}</Card.Title>
                                    <Card.Text>
                                        Stock: {producto.stock}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">{formatPrice(producto.price)}</small>
                                    <br />
                                    <Button title="Comprar" variant="dark">
                                        Agregar
                                    </Button>
                                </Card.Footer>
                            </Card>
                        ))}

                    </CardDeck>
                </div>
            ))
            }
        </div>
    );
}

