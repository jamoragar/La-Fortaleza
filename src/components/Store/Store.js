import React from 'react';
import { productos } from "../Data/DataProductos";
import { formatPrice } from "../Data/DataProductos";
import { CardDeck, Card, Button } from "react-bootstrap";

import './Store.css';


export default function Store() {
    return (
        <div className="p-3">
            {Object.entries(productos).map(([categoriaName, productos], i) => (
                <div key={i}>
                    <h1>{categoriaName}</h1>
                    <CardDeck>
                        {productos.map((producto, i) => (
                            <Card border="light" style={{ width: '18rem' }} key={i}>
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
        </div >
    );
}

/*  */
