import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import firebase from '../../../../config/firebase';

const EditarProducto = (props) => {
    const [fbProducto, setFbProducto] = useState(null);
    const [fbCategoria, setFbCategoria] = useState(null);
    const [subCat, setSubCat] = useState(null);
    let { id } = useParams();
    let descripciones = [];

    useEffect(() => {
        firebase.database().ref(`/Productos/${id}`).on('value', (snapshot) => {
            setFbProducto(snapshot.val());
        })
        firebase.database().ref('/Category').orderByChild('description').on('value', (snapshot) => {
            // console.log('nombre del nodo: ' + snapshot.key + ' description: ' + snapshot.val().description);
            snapshot.forEach(child => {
                // console.log(child.val().description)
                descripciones.push(child.val().description);
            });
            setFbCategoria(descripciones);
        });

    }, []);

    const handleSubCategory = (categoria) => {
        if (categoria === '0') {
            setSubCat(null);
        } else {
            firebase.database().ref('/Category').orderByChild('description/').equalTo(`${categoria}`).on('value', snapshot => {
                snapshot.forEach((child) => {
                    setSubCat(child.val().subCat)
                })
            });
        }
    }

    if (id && fbProducto && fbCategoria) {
        const { id, nombre, descripcion, categoria, subcategoria, precio, stock } = fbProducto;
        return (
            <div>
                <h3>Producto ID: {id}</h3>
                <Form>
                    <Form.Group controlId='formNameProducts'>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control name='nombre' type='text' defaultValue={nombre} />
                    </Form.Group>
                    <Form.Group controlId="formDescriptionProducts">
                        <Form.Label>Descripción:</Form.Label>
                        <Form.Control name='descripcion' as="textarea" rows="4" defaultValue={descripcion} />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Categoría:</Form.Label>
                        <Form.Control name='categoria' as="select"
                            onChange={(categoria) => handleSubCategory(categoria.target.value)}>
                            {fbCategoria.map((categoria_arr, i) => {
                                return <option key={i} value={categoria_arr === categoria ? true : false} >{categoria_arr}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    {
                        subCat ?
                            <Form.Group controlId="formSubCategory">
                                <Form.Label>Sub-Categoría:</Form.Label>
                                <Form.Control name='subcategoria' as="select" >
                                    {/* Transformamos el hook subCat a array, ya que firebase lo entrega como Objeto, y se procede a recorrerlo. */
                                        Object.entries(subCat).map(([abreviacion, nombre], i) => {
                                            return <option key={i} value={nombre.description === subcategoria ? true : false}>{nombre.description}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            :
                            handleSubCategory(categoria)
                    }
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="formPriceProducts">
                                <Form.Label>Precio:</Form.Label>
                                <Form.Control name='precio' type="number" defaultValue={precio} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formStockProducts">
                                <Form.Label>Stock Web:</Form.Label>
                                <Form.Control name='stock' type="number" defaultValue={stock} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <br />
                    <Button variant='success' block>
                        <i className="fas fa-undo fa-fw" />
                        Actualizar
                    </Button>
                    <br />
                    <Link to='/Dashboard/:uid/Productos'>
                        <Button variant="outline-primary" block>
                            <i className="fas fa-undo fa-fw" />
                            Volver
                        </Button>
                    </Link>
                </Form>
            </div>
        );
    } else {
        return (
            <>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </>
        )
    }
}

export default EditarProducto;