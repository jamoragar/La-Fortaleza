import React, { useState, useRef } from 'react';
import { Modal, Button, Form, InputGroup, Spinner, Overlay, Tooltip } from 'react-bootstrap';
import firebase from '../../../config/firebase';


const EditarPerfil = (props) => {
    const user = props.usuario;
    const [btnText, setBtnText] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const target = useRef(null);
    console.log(user.uid);

    const handleUpdate = (e) => {
        e.preventDefault();
        setBtnText(true);
        const { name, last_name, email, number, password, address, comentario } = e.target.elements;
        console.log('updateing User DAta...');

        let uid = user.uid;
        console.log(uid)
        firebase.database().ref().child('Users/' + uid).update({
            uid: uid,
            nombre: name.value,
            apellido: last_name.value,
            numero: number.value,
            email: email.value,
            password: password.value,
            direccion: address.value,
            comentario: comentario.value,
        })

    }
    return (
        <div>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Datos de Usuario: {`${user.nombre} ${user.apellido}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formUserName">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control name='name' type="text" defaultValue={user.nombre} required />
                        </Form.Group>
                        <Form.Group controlId="formUserLastName">
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control name='last_name' type="text" defaultValue={user.apellido} required />
                        </Form.Group>
                        <Form.Group controlId="formUserAddress">
                            <Form.Label>Dirección:</Form.Label>
                            <Form.Control name='address' type="text" defaultValue={user.direccion} required />
                        </Form.Group>
                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control name='email' type="text" defaultValue={user.email} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Celular</Form.Label>
                            <InputGroup>
                                <Form.Control type='text' name='number' defaultValue={user.numero} required />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Comentario:</Form.Label>
                            <Form.Control as='textarea' defaultValue={user.comentario} rows='3' name='comentario' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control type="password" defaultValue={user.password} name='password' required />
                        </Form.Group>
                        <Button style={{ marginBottom: ".5rem" }}
                            variant="outline-success"
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
                                    'Guardar Edición  '
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

export default EditarPerfil;