import React from 'react';
import { Card, Button, CardColumns} from 'react-bootstrap';
import styled from 'styled-components';



const Cards = () => {
    return (
        <Cardcontent>
            <CardColumns className="px-3 py-3 sm" >
                <Card>
                    <Card.Img variant="top" src="img/card1.jpg" />
                        <Card.Body>
                            <Card.Title>Camel Up</Card.Title>
                            <Card.Text>
                                <p>Camel Up es un juego familiar para 2 a 8 jugadores, sencillo, rápido y escandalosamente emocionante. Al acabar cada partida de aproximadamente 20 minutos de duración, no podrás resistirte y volverás a retar a tus compañeros de juego para dilucidar nuevamente al ganador.</p>
                                <p><a href="https://youtu.be/JK9VpByZNyE" target="blanc">Video</a></p>
                            </Card.Text>
                        </Card.Body>
                    <Card.Footer>
                        <Button title="Comprar" variant="dark">Comprar</Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="img/card2.jpg" />
                        <Card.Body>
                            <Card.Title>Cortex</Card.Title>
                            <Card.Text>
                                <p>Cortex pone a juego tu agilidad visual, tu coordinación, tu memoria, capacidad de razonamiento … ¡incluso la sensibilidad de tu tacto!</p>
                                <p>El objetivo del juego es ganar la mayor cantidad de cartas reto. Para ello, tendrás que ser el primer jugador en tapar la carta en curso con la mano y dar la respuesta correcta.</p>
                                <p><a href="https://youtu.be/zTJ5anbPgBk" target="blanc">Video</a></p>
                                <p>- model: Kids</p>
                            </Card.Text>
                        </Card.Body>
                    <Card.Footer>
                        <Button title="Comprar" variant="dark">Comprar</Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="img/card3.jpg" />
                        <Card.Body>
                            <Card.Title>Dobble</Card.Title>
                            <Card.Text>
                                <p>Dobble un juego con más de 50 símbolos, 55 cartas, con uno, y solamente un símbolo idéntico entre cada carta. ¿Serás capaz de descubrirlo?</p>
                                <p>Busca el símbolo idéntico en dos cartas, dílo en voz alta y coger o deja una carta, según las reglas del mini-juego al que estéis jugando.</p>
                                <p>Velocidad, observación, reflejos… ¡encadena todos los mini-juegos en un ambiente delirante!</p>
                                <p>- model: Numeros</p>
                            </Card.Text>
                        </Card.Body>
                    <Card.Footer>
                        <Button title="Comprar" variant="dark">Comprar</Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="img/card4.jpg" />
                    <Card.Body>
                        <Card.Title>Colonos de Catan</Card.Title>
                        <Card.Text>
                            <p>Pocos juegos reúnen tantas cualidades como Los Colonos de Catan. Su mecánica innovadora, capaz de satisfacer hasta el paladar del jugador más exquisito en materia de juegos de mesa, lo ha hecho merecedor de los más importantes premios internacionales.</p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button title="Comprar" variant="dark">Comprar</Button>
                    </Card.Footer>
                </Card><Card>
                    <Card.Img variant="top" src="img/card5.jpg" />
                    <Card.Body>
                        <Card.Title>Dixit</Card.Title>
                        <Card.Text>
                            <p>Dixit es el amado juego ilustrado de creatividad y adivinanzas, en donde tu imaginación es el narrador de la historia.</p>
                            <p><a href="https://www.youtube.com/watch?v=z0QkkTJ3Hww" target="blanc">Video</a></p>
                            <p></p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button title="Comprar" variant="dark">Comprar</Button>
                    </Card.Footer>
                </Card>
            </CardColumns>
        </Cardcontent>
   )
}

export default Cards;

const Cardcontent = styled.div`

    .card-footer {
        text-align: center;
    }

    .card-title {
        font-size: 25px;
    }

`;





