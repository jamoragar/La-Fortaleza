import React from 'react';
import { Form, Modal } from 'react-bootstrap';

const EditarProducto = (props) => {
    const producto = props.product;
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('updateing product...');
    }
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto ID: {producto.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId='formNameProducts'>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control name='nombre' type='text' defaultValue={producto.nombre} required />
                    </Form.Group>
                    <Form.Group controlId="formDescriptionProducts">
                        <Form.Label>Descripción:</Form.Label>
                        <Form.Control name='descripcion' as="textarea" rows="3" defaultValue={producto.descripcion} required />
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditarProducto;