import React, {useState, useEffect} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import firebase from '../../../../config/firebase';

const AgregarProducto = (props) => {
    const [fbCategoria, setFbCategoria] = useState(null);
    const fbDbCategory = firebase.database().ref('/Category');
    let descripciones = []

    useEffect(() =>{
        fbDbCategory.orderByChild('description').on('value', (snapshot) => {
            // console.log('nombre del nodo: ' + snapshot.key + ' description: ' + snapshot.val().description);
            snapshot.forEach(child => {
                // console.log(child.val().description)
                descripciones.push(child.val().description);
            });
            setFbCategoria(descripciones);
        })
    }, []);

    return (
        <Modal {...props} style={{background:'none'}}>
            <Modal.Header closeButton>
                <Modal.Title>
                Agregar Nuevo Producto
                </Modal.Title>
            </Modal.Header>
            {
                fbCategoria ?
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='formNameProducts'>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type='text' placeholder='Ingrese el nombre del producto.' />
                        </Form.Group>
                        <Form.Group controlId="formDescriptionProducts">
                            <Form.Label>Descripción:</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder='Ingrese la descripción del producto.' />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Categoría:</Form.Label>
                            <Form.Control as="select">
                                {fbCategoria.map((categoria, i) => {
                                    return <option value={categoria} key={i}>{categoria}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPriceProducts">
                            <Form.Label>Precio:</Form.Label>
                            <Form.Control type="number" placeholder='Ingrese el valor del producto.' />
                        </Form.Group>
                        <Button variant="success" block>
                            <i className="far fa-save fa-fw" />
                            Aceptar
                        </Button>
                        {' '}
                        <Button variant="outline-secondary" block>
                            <i className="fas fa-undo fa-fw" />
                            Reiniciar
                        </Button>
                    </Form>
                </Modal.Body>
            :
            <h3>Loading...</h3>
            }
        </Modal>
    )
}

export default AgregarProducto;