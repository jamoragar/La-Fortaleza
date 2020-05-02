import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import firebase from '../../../../config/firebase';

const ProductoModal = (id, nombre, descripcion, categoria, subcategoria, precio, stock, images, history) => {
    console.log(history)
    return (
        <div>
            <h3>Producto ID: {id}</h3>
            <Form>
                <Form.Group controlId='formNameProducts'>
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control name='nombre' type='text' value={nombre} readOnly />
                </Form.Group>
                <Form.Group controlId="formDescriptionProducts">
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control name='descripcion' as="textarea" rows="4" value={descripcion} readOnly />
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Categoría:</Form.Label>
                    <Form.Control name='categoria' as="select" readOnly>
                        <option value={categoria} key={categoria}>{categoria}</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Sub-Categoría:</Form.Label>
                    <Form.Control name='subcategoria' as="select" readOnly>
                        <option value={subcategoria} key={subcategoria}>{subcategoria}</option>
                    </Form.Control>
                </Form.Group>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formPriceProducts">
                            <Form.Label>Precio:</Form.Label>
                            <Form.Control name='precio' type="number" value={precio} readOnly />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formStockProducts">
                            <Form.Label>Stock Web:</Form.Label>
                            <Form.Control name='stock' type="number" value={stock} readOnly />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Button variant="outline-primary" block onClick={() => history.goBack()}>
                    <i className="fas fa-undo fa-fw" />
                    Volver
                </Button>
            </Form>
        </div>
    )
}

const VerProducto = (props) => {
    const [fbProducto, setFbProducto] = useState(null);
    const productData = props.location.data;
    let { id } = useParams();

    useEffect(() => {
        firebase.database().ref(`/Productos/${id}`).on('value', (snapshot) => {
            setFbProducto(snapshot.val());
        })
    }, []);

    if (id && fbProducto) {
        const { id, nombre, descripcion, categoria, subcategoria, precio, stock } = fbProducto;
        return (
            ProductoModal(id, nombre, descripcion, categoria, subcategoria, precio, stock, null, props.history)
        );
    } else {
        return (
            <div>
                <h3>Cargando producto...</h3>
            </div>
        )
    }
}

export default VerProducto;