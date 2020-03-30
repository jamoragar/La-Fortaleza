import React from 'react';
import { formatPrice } from "../../Data/DataProductos";
import { CardDeck, Card, Button, Spinner } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const BoardingGames = (props) => {
  const { fbData } = props;
  const { Productos } = fbData;
  const productos = Productos;
  let productosToArray = [];

  console.log(productos);

  if (productos) {
    Object.keys(productos).map((key, i) => {
      productosToArray[i] = productos[key]
    })

    return (
      <div className="p-3">
        <a href="/BoardingGames">
          <Image
            title="Juegos de Mesa"
            src="img/banners/BannerBg.png"
            fluid
            className="mb-5"
          />
        </a>
        <CardDeck>
          {
            productosToArray.map((producto, i) => {
              return (
                <div key={i}>
                  <Card className="mb-5" border="light" style={{ width: '18rem' }}>
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
export default BoardingGames;