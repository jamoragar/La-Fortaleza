import React, { useState, useRef } from 'react';
import { Modal, Button, Form, InputGroup, Spinner, Overlay, Tooltip } from 'react-bootstrap';
import firebase from '../../../../config/firebase';

const UpdateOrderState = (props) => {

    const [numeroOrden, setNumeroOrden] = useState(null)
    const [btnText, setBtnText] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const target = useRef(null);


    const orden = props;
    console.log(orden);

    return (
        <div>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title><h2 style={{ fontWeight: 'bolder', color: '#606060' }}>Actualizacion de Estado de Pedidos.</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group controlId="formUserName">
                            <Form.Label>Ingrese el Numero de la Orden que desea Actualizar: </Form.Label>
                            <Form.Control name='orderId' type="text" required />
                        </Form.Group>
                        <Button style={{ marginBottom: ".5rem" }}
                            variant="success"
                            ref={target}
                            block
                            type='submit'>
                            {
                                btnText ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                    :
                                    'Actualizar Estado'
                            }
                            <i className="fas fa-save fa-fw" />
                        </Button>
                        <Overlay target={target.current}
                            show={show}
                            placement="top"
                            onHide={() => setShow(false)} rootClose={true}>
                            {props => {
                                return (
                                    <Tooltip className="tooltip-error" {...props} show={props.show.toString()}>
                                        {message}
                                    </Tooltip>
                                );
                            }}
                        </Overlay>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UpdateOrderState;