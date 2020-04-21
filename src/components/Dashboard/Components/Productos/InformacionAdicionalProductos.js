import React from 'react';
import { Form, Col } from 'react-bootstrap';

const InformacionAdicionalProductos = (props) => {
    return(
        <>
        <Form.Row>
            <Col>
                <Form.Group>
                    <Form.Label>Editiorial:</Form.Label>
                    <Form.Control name='editorial' type='text' placeholder='Editorial del producto.'  />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Jugadores:</Form.Label>
                    <Form.Control name='jugadores' type='text' placeholder='Cantidad de Jugadores.'  />
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
                <Form.Group>
                    <Form.Label>Edad Mínima:</Form.Label>
                    <Form.Control name='edad' type='text' placeholder='Edad mínima recomendada.'  />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Idioma Dependiente:</Form.Label>
                    <Form.Control name='idioma_dependiente' type='text' placeholder='¿Necesito saber otro idioma?'  />
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
                <Form.Group>
                    <Form.Label>Idioma:</Form.Label>
                    <Form.Control name='idioma' type='text' placeholder='Idioma del producto.'  />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Autor/Autores:</Form.Label>
                    <Form.Control name='autores' type='text' placeholder='Nombre del Autor(es).'  />
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
                <Form.Group>
                    <Form.Label>Duración en min.:</Form.Label>
                    <Form.Control name='duracion' type='text' placeholder='¿Cuanto dura una partida?'  />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Dimensiones:</Form.Label>
                    <Form.Control name='dimensiones' type='text' placeholder='(A x B x C cm.).'  />
                </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Peso:</Form.Label>
                <Form.Control name='peso' type='text' placeholder='Peso en Kg.'  />
            </Form.Group>
            </Col>
        </Form.Row>
        <Form.Group controlId="formDescriptionProducts">
            <Form.Label>Componentes:</Form.Label>
            <Form.Control name='componentes' as="textarea" rows="3" placeholder='Componentes que trae consigo el juego.'  />
        </Form.Group>
        </>
    );
}

export default InformacionAdicionalProductos;