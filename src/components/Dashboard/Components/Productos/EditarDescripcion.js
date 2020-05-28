import React, { useState } from 'react';
import firebase from '../../../../config/firebase';
import { Form, Col, Modal, Spinner, Button, Alert } from 'react-bootstrap';

const EditarDescripcion = (props) => {
    const [alertShow, setAlertShow] = useState(false);
    const [buttonAceptarText, setButtonAceptarText] = useState(true);
    const checked = true;
    const { prodid, description } = props;
    const key = prodid;

    const submitProduct = (e) => {
        e.preventDefault();
        const { editorial, jugadores, edad, idioma_dependiente, idioma, autores, duracion, dimensiones, peso, componentes } = e.target.elements;
        if (key !== null) {
            firebase.database().ref().child(`/Productos/${key}`).update({
                incluye_pestanas: checked,
                ficha_tecnica: checked ? {
                    editorial: editorial.value,
                    jugadores: jugadores.value,
                    edad: edad.value,
                    idioma_dependiente: idioma_dependiente.value,
                    idioma: idioma.value,
                    autores: autores.value,
                    duracion: duracion.value,
                    dimensiones: dimensiones.value,
                    peso: peso.value,
                    componentes: componentes.value,

                } : null,
            })
        } else {
            Alert(`Debes completar todos los campos`)
        }
    }

    return (
        <Modal {...props} style={{ background: 'none' }} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1 style={{ fontWeight: 'bolder', color: '#606060' }}>Editar Descripción</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitProduct} id='myForm'>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Editiorial:</Form.Label>
                                <Form.Control name='editorial' type='text' defaultValue={description.editorial} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Jugadores:</Form.Label>
                                <Form.Control name='jugadores' type='text' defaultValue={description.jugadores} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Edad Mínima:</Form.Label>
                                <Form.Control name='edad' type='text' defaultValue={description.edad} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Idioma Dependiente:</Form.Label>
                                <Form.Control name='idioma_dependiente' type='text' defaultValue={description.idioma_dependiente} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Idioma:</Form.Label>
                                <Form.Control name='idioma' type='text' defaultValue={description.idioma} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Autor/Autores:</Form.Label>
                                <Form.Control name='autores' type='text' defaultValue={description.autores} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Duración en min.:</Form.Label>
                                <Form.Control name='duracion' type='text' defaultValue={description.duracion} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Dimensiones:</Form.Label>
                                <Form.Control name='dimensiones' type='text' defaultValue={description.dimensiones} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Peso:</Form.Label>
                                <Form.Control name='peso' type='text' defaultValue={description.peso} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group controlId="formDescriptionProducts">
                        <Form.Label>Componentes:</Form.Label>
                        <Form.Control name='componentes' as="textarea" rows="3" defaultValue={description.componentes} />
                    </Form.Group>
                    <Button type='submit' variant="success" block style={{ margin: '20px 0 0 0' }}>
                        {buttonAceptarText ? (<><i className="far fa-save fa-fw" />Aceptar</>) : (<Spinner animation="border" />)}
                    </Button>
                    {' '}
                    <br />
                    <Alert show={alertShow} variant={'success'} onClose={() => setAlertShow(false)} dismissible>
                        Descripción actualizada con éxito!
                        </Alert>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditarDescripcion;