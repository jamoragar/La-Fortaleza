import React, { useState, useEffect } from "react";
import { CardDeck, Card, Image, Spinner, Button } from 'react-bootstrap';
import firebase from "../../../config/firebase";
import { formatPrice } from '../../Data/DataProductos';

export default function JuegosDeCartas(props) {
  const [category, setCategory] = useState(null);
  const { fbData, categoriasProductos } = props;
  useEffect(() => {
    firebase.database().ref('/Category').on('value', snapshot => {
      setCategory(snapshot.val());
    })
  }, []);

  if (fbData && category) {
    return (
      <div>
        {categoriasProductos.map((categoriaProducto, i) => {
          console.log(categoriaProducto);
          return categoriaProducto === 'Juegos De Cartas' ? (
            <div key={i}>
              {Object.entries(category).map(([abreviacion, contenido], i) => {
                return categoriaProducto === contenido.description ? (
                  <a key={i} href={contenido.path}>
                    <Image
                      key={i}
                      className="p-3"
                      title="Banner"
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

