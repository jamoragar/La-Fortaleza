import React from 'react';
import { Form, Modal, InputGroup, Button } from 'react-bootstrap';


const EditarPerfil = (props) => {
    const user = props.usuario;
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('updateing User DAta...');
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
                        <Button
                            style={{ marginBottom: ".5rem" }}
                            variant="outline-success"
                            block
                            type="submit"
                        >
                            <i className="fas fa-save fa-fw" />
                                    Guardar Edición
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditarPerfil;