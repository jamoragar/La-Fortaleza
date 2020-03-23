import React from "react";
import { Card, Button, CardDeck } from "react-bootstrap";

import "./Cards.scss";

const Cards = () => {
  return (
    <CardDeck className="p-3">
      <Card className="p-1">
        <Card.Img variant="top" src="img/Cards/Camel-Up.png" />
        <Card.Body>
          <Card.Title>Camel Up</Card.Title>
          <Card.Text>Disponible</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
      <Card className="p-1">
        <Card.Img variant="top" src="img/grid2.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>Disponible</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
      <Card className="p-1">
        <Card.Img variant="top" src="img/grid3.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>Disponible</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
      <Card className="p-1">
        <Card.Img variant="top" src="img/grid4.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>Disponible</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
      <Card className="p-1">
        <Card.Img variant="top" src="img/grid5.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>Disponible</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button title="Comprar" variant="dark">
            Comprar
          </Button>
        </Card.Footer>
      </Card>
    </CardDeck>
  );
};

export default Cards;
