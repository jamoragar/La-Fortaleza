import React from 'react';
import { formatPrice } from "../Data/DataProductos";
import { CardDeck, Card, Button, Spinner } from "react-bootstrap";
import './Store.css';

const Store = (props) => {
<<<<<<< HEAD
    const { fbData } = props;
    const { Productos } = fbData;
    const productos = Productos;
    let productosToArray = [];
=======
    const { fbData, categorias } = props;
    
    //console.log(Productos);
>>>>>>> a525a20e91b24697016c57d46b6a9c97d11f5b63

    console.log(productos);




<<<<<<< HEAD
    if (productos) {
        Object.keys(productos).map((key, i) => {
            productosToArray[i] = productos[key]
        })

        return (
            <div className="p-3">
                <CardDeck>
                    {
                        productosToArray.map((producto, i) => {
                            return (
                                <div key={i}>
                                    <Card border="light" style={{ width: '18rem' }}>
                                        <Card.Img src={producto.img} variant="top" />
                                        <Card.Body>
                                            <Card.Title>{producto.nombre}</Card.Title>
                                            <Card.Text>
                                                Stock: {producto.stock}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">{formatPrice(producto.precio)}</small>
                                            <br />
                                            <Button title="Comprar" variant="dark">
                                                Agregar
                                    </Button>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </CardDeck>
=======
    if (fbData) {
        return(
            <div>
            {categorias.map((categoria, i)=>{
                return(
                    <div>
                        <h1 key={i}>{categoria}</h1>
                            <div className="p-3">
                                <CardDeck>
                                    {fbData.map((producto, j) => {
                                        return producto.categoria == categoria ? (
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
                                                        <small className="text-muted">{formatPrice(producto.precio)}</small>
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
>>>>>>> a525a20e91b24697016c57d46b6a9c97d11f5b63
            </div>
        )
                
    } else {
        return (
            <div>
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
            </div>
        )
    }
}

export default Store;

