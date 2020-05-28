import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import AgregarDescripcion from './AgregarDescripcion';
import EditarDescripcion from './EditarDescripcion';

const Descripcion = (props) => {

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const descTab = props;
    const prodid = descTab.data.id;
    let descTabToArray = [];

    if (descTab && descTab.data.ficha_tecnica && prodid) {

        Object.keys(descTab).forEach((key, i) => {
            descTabToArray[i] = descTab[key]
        });
        //console.log(descTabToArray[1].ficha_tecnica)

        let description = descTabToArray[1].ficha_tecnica;

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h3 style={{ marginTop: "3rem", marginBottom: "3rem", fontWeight: 'bolder', color: '#606060' }}>Tabla de Descripción</h3>
                    </div>
                </div>
                <div className="col text-center" >
                    <Button style={{ float: 'center', marginRight: '1rem', marginTop: '3rem', marginBottom: '2rem', width: '100' }} onClick={handleShow} variant="success">
                        <i className="fas fa-info-circle fa-fw" />
                                Editar Descripción
                        </Button>
                    <EditarDescripcion show={showModal} onHide={() => setShowModal(false)} prodid={prodid} description={description} />
                </div>
                <div className="row">
                    <div className="col" style={{ marginLeft: "6rem", marginRight: "6rem", marginBottom: "4rem" }}>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Editiorial:</Form.Label>
                                    <Form.Control name='editorial' type='text' defaultValue={description.editorial} readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Jugadores:</Form.Label>
                                    <Form.Control name='jugadores' type='text' defaultValue={description.jugadores} readOnly />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Edad Mínima:</Form.Label>
                                    <Form.Control name='edad' type='text' defaultValue={description.edad} readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Idioma Dependiente:</Form.Label>
                                    <Form.Control name='idioma_dependiente' type='text' defaultValue={description.idioma_dependiente} readOnly />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Idioma:</Form.Label>
                                    <Form.Control name='idioma' type='text' defaultValue={description.idioma} readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Autor/Autores:</Form.Label>
                                    <Form.Control name='autores' type='text' defaultValue={description.autores} readOnly />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Duración en min.:</Form.Label>
                                    <Form.Control name='duracion' type='text' defaultValue={description.duracion} readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Dimensiones:</Form.Label>
                                    <Form.Control name='dimensiones' type='text' defaultValue={description.dimensiones} readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Peso:</Form.Label>
                                    <Form.Control name='peso' type='text' defaultValue={description.peso} readOnly />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="formDescriptionProducts">
                            <Form.Label>Componentes:</Form.Label>
                            <Form.Control name='componentes' as="textarea" rows="3" defaultValue={description.componentes} readOnly />
                        </Form.Group>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <div className="row">
                    <div className="col text-center" >
                        <Button style={{ float: 'center', marginRight: '1rem', marginTop: '3rem', marginBottom: '2rem', width: '100' }} onClick={handleShow} variant="success">
                            <i className="fas fa-info-circle fa-fw" />
                                Agregar Descripción
                        </Button>
                        <AgregarDescripcion show={showModal} onHide={() => setShowModal(false)} prodid={prodid} />
                    </div>
                </div>
                <div className="col text-center">
                    <h4 style={{ marginBottom: "3rem", marginTop: "1rem", fontWeight: 'bolder', color: '#606060' }}>No Hay Descripción para mostrar.</h4>
                </div>
            </div>
        )
    }
}

export default Descripcion;