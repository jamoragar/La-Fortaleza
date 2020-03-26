import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import firebase from '../../../../config/firebase';
import productosStyles from './Productos.module.scss'


const AgregarProducto = (props) => {
    const [fbCategoria, setFbCategoria] = useState(null);
    const [subCat, setSubCat] = useState(null);
    const fbDbCategory = firebase.database().ref('/Category');
    let descripciones = []

    useEffect(() => {
        fbDbCategory.orderByChild('description').on('value', (snapshot) => {
            // console.log('nombre del nodo: ' + snapshot.key + ' description: ' + snapshot.val().description);
            snapshot.forEach(child => {
                // console.log(child.val().description)
                descripciones.push(child.val().description);
            });
            setFbCategoria(descripciones);
        })
    }, []);

    const handleSubCategory = (categoria) => {
        fbDbCategory.orderByChild('description/').equalTo(`${categoria}`).on('value', snapshot => {
            snapshot.forEach((child) => {
                setSubCat(child.val().subCat)
            })
        });
    }

    return (
        <Modal {...props} style={{ background: 'none' }}>
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
                            <Form.Group controlId="formCategory">
                                <Form.Label>Categoría:</Form.Label>
                                <Form.Control name='selectCategory' as="select" onChange={(categoria) => handleSubCategory(categoria.target.value)}>
                                    <option value='no_select' key='alfa'>Seleccione una categoría</option>
                                    {fbCategoria.map((categoria, i) => {
                                        return <option value={categoria} key={i}>{categoria}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                            :
                            null
                        }
                        <Form.Group controlId="formPriceProducts">
                                <Form.Label>Precio:</Form.Label>
                                <Form.Control type="number" placeholder='Ingrese el valor del producto.' />
                            </Form.Group>

                            <div className={'custom-file'} style={{ marginBottom: '12px' }}>
                                <input type="file" className={'custom-file-input'} id="customFile" onChange={orientImage} accept="image/*" multiple />
                                <label className="custom-file-label" htmlFor="customFile">Buscar Imagen(es)</label>
                            </div>
                            {
                                image ? (
                                    <div className={productosStyles.containerImg}>
                                        {
                                            (image || []).map((url, i) => {
                                                return (
                                                    <div className={productosStyles.boxImg} key={i}>
                                                        <img src={url} alt="..." />
                                                        <div className={productosStyles.optionImg}>
                                                            <button className={productosStyles.deleteImg}>
                                                                <svg class={productosStyles.svgX} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                                    :
                                    null
                            }

                            <br />
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