import React from 'react';
import firebase from '../../../../config/firebase';
import { Form, Modal } from 'react-bootstrap';

const EditarProducto = (props) => {
    const producto = props.product;
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('updateing product...');
    }
    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <Modal {...props} style={{ background: 'none' }}>
=======
        <Modal {...props}>
>>>>>>> parent of 470d7d7... Se Restructuran los props, se agrega vista seleccitava para cada categoria y se sincroniza con modificaciones hechas por javier.
=======
        <Modal {...props}>
>>>>>>> parent of 470d7d7... Se Restructuran los props, se agrega vista seleccitava para cada categoria y se sincroniza con modificaciones hechas por javier.
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
<<<<<<< HEAD
<<<<<<< HEAD
                        <Form.Control name='descripcion' as="textarea" rows="4" defaultValue={producto.descripcion} required />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Categoría:</Form.Label>
                        <Form.Control name='categoria' as="select">
                            <option value='0' key='alfa'>Seleccione una categoría</option>
                            {/*fbCategoria.map((categoria, i) => {
                                return <option value={categoria} key={i}>{categoria}</option>
                            })*/}
                        </Form.Control>
=======
                        <Form.Control name='descripcion' as="textarea" rows="3" defaultValue={producto.descripcion} required/>
>>>>>>> parent of 470d7d7... Se Restructuran los props, se agrega vista seleccitava para cada categoria y se sincroniza con modificaciones hechas por javier.
=======
                        <Form.Control name='descripcion' as="textarea" rows="3" defaultValue={producto.descripcion} required/>
>>>>>>> parent of 470d7d7... Se Restructuran los props, se agrega vista seleccitava para cada categoria y se sincroniza con modificaciones hechas por javier.
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditarProducto;