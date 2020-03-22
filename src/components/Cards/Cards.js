import React from "react";
import { Card, Button, CardColumns } from "react-bootstrap";

import "./Cads.scss";

const Cards = () => {
  return (
    <CardColumns className="p-3">
      <Card>
        <Card.Img variant="top" src="img/card1.jpg" />
        <Card.Body>
          <Card.Title>Camel Up</Card.Title>
          <Card.Text>
            Camel Up es un juego familiar para 2 a 8 jugadores, sencillo, rápido
            y escandalosamente emocionante. Al acabar cada partida de
            aproximadamente 20 minutos de duración, no podrás resistirte y
            volverás a retar a tus compañeros de juego para dilucidar nuevamente
            al ganador.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="img/grid2.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{" "}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="img/grid3.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="img/grid4.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="img/grid5.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
    </CardColumns>
  );
};

export default Cards;
