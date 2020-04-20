import React from 'react';
import { Form, Button, Modal, Col, Alert, Spinner, ProgressBar } from 'react-bootstrap';

const InformacionAdicionalProductos = (props) => {
    console.log(props)
    return(
        <Modal {...props} style={{ background: 'none' }}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Detalle y Descripción
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Editiorial:</Form.Label>
                                <Form.Control name='editorial' type='text' placeholder='Editorial del producto.' required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Jugadores:</Form.Label>
                                <Form.Control name='jugadores' type='text' placeholder='Cantidad de Jugadores.' required />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Edad Mínima:</Form.Label>
                                <Form.Control name='nombre' type='text' placeholder='Edad mínima recomendada.' required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Idioma Dependiente:</Form.Label>
                                <Form.Control name='idioma_dependiente' type='text' placeholder='¿Necesito saber otro idioma?' required />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Idioma:</Form.Label>
                                <Form.Control name='idioma' type='text' placeholder='Idioma del producto.' required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Autor/Autores:</Form.Label>
                                <Form.Control name='autores' type='text' placeholder='Nombre del Autor(es).' required />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Duración en min.:</Form.Label>
                                <Form.Control name='duracion' type='text' placeholder='¿Cuanto dura una partida?' required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Dimensiones:</Form.Label>
                                <Form.Control name='dimensiones' type='text' placeholder='(A x B x C cm.).' required />
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Peso:</Form.Label>
                            <Form.Control name='peso' type='text' placeholder='Peso en Kg.' required />
                        </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group controlId="formDescriptionProducts">
                        <Form.Label>Componentes:</Form.Label>
                        <Form.Control name='componentes' as="textarea" rows="3" placeholder='Componentes que trae consigo el juego.' required />
                    </Form.Group>
                    <Button type='submit' variant="success" block style={{margin:'20px 0 0 0'}}>
                        Aceptar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default InformacionAdicionalProductos;