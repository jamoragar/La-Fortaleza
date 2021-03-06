import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Col, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import firebase from '../../../../config/firebase';
import productosStyles from './Productos.module.scss';
import InformacionAdicionalProductos from './InformacionAdicionalProductos';
import moment from 'moment';


const AgregarProducto = (props) => {
    const [fbCategoria, setFbCategoria] = useState(null);
    const [subCat, setSubCat] = useState(null);
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState([]);
    const [alertShow, setAlertShow] = useState(false);
    const [buttonAceptarText, setButtonAceptarText] = useState(true);
    const [checked, setChecked] = useState(false);
    const [progress, setProgress] = useState(0);

    const fbDbCategory = firebase.database().ref('/Category');
    let descripciones = [];
    let images = [];
    let fileArray = [];

    //Función que recorre los archivos subidos y los transforma en blob para, posteriormente crear un array de estos y previsualizarlos dentro del formulario.
    const orientImage = async ({ target }) => {
        images.push(target.files)
        setFiles(target.files)
        for (let i = 0; i < images[0].length; i++) {
            fileArray.push(URL.createObjectURL(images[0][i]));
        }
        setImage(await fileArray);
    }
    //Al renderisar el componente, se hace un llamado a firebase consultando por las descripciones de cada categoría.
    useEffect(() => {
        fbDbCategory.orderByChild('description').on('value', (snapshot) => {
            // console.log('nombre del nodo: ' + snapshot.key + ' description: ' + snapshot.val().description);
            snapshot.forEach(child => {
                // console.log(child.val().description)
                descripciones.push(child.val().description);
            });
            setFbCategoria(descripciones);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //Función que llama las subcategorías según corresponda en firebase.
    const handleSubCategory = (categoria) => {
        if (categoria === '0') {
            setSubCat(null);
        } else {
            fbDbCategory.orderByChild('description/').equalTo(`${categoria}`).on('value', snapshot => {
                snapshot.forEach((child) => {
                    setSubCat(child.val().subCat)
                })
            });
        }
    }
    //Función que borra un elemento del array que contiene las imagenes agregadas en el formulario.
    const deleteImage = (e, name) => {
        e.preventDefault();
        setImage(image.filter((image) => image !== name))

    }
    const handleReset = () => {
        document.getElementById('myForm').reset();
        setImage(null);
        setSubCat(null);
        setChecked(false);
    }
    const handleCheck = () => {
        setChecked(!checked);
    }
    //Función que toma el valor de cada input en el formulario para, posteriormente, validarlos y subirlos a la BD de firebase.
    const submitProduct = (e) => {
        //Se previene que la página refresque.
        e.preventDefault();
        const promises = [];
        //Campos de Formulario SIN Ficha Tecnica
        const { nombre, descripcion, categoria, subcategoria, precio, stock, video } = e.target.elements;
        //Campos de formulario CON Ficha Tecnica
        const { editorial, jugadores, edad, idioma_dependiente, idioma, autores, duracion, dimensiones, peso, componentes } = e.target.elements;
        const FbDownloadURL = []

        if (files.length > 0 && categoria.value !== '0') {
            setButtonAceptarText(false)
            //Según la cantidad de archivos recorremos el hook files y subimos dichos archivos al bucket de firebase.
            for (let i = 0; i < files.length; i++) {
                const uploadTask = firebase.storage().ref().child(`IMG/Productos/${nombre.value.trim()}/img_${nombre.value.trim()}_${i}`).put(files[i])
                promises.push(uploadTask);
                uploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                            setProgress(progress);
                        }
                    },
                    error => console.log(error.code),
                    async () => {
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        FbDownloadURL.push(downloadURL);
                        if (FbDownloadURL.length === files.length) {
                            const key = firebase.database().ref().push().key;
                            firebase.database().ref().child(`/Productos/${key}`).set({
                                id: key,
                                nombre: nombre.value.trim(),
                                descripcion: descripcion.value,
                                categoria: categoria.value,
                                subcategoria: subcategoria.value,
                                precio: precio.value,
                                stock: stock.value,
                                video: video.value,
                                fecha_creacion: Date.now(),
                                incluye_pestanas: checked,
                                ficha_tecnica: checked ? {
                                    editorial: editorial.value,
                                    jugadores: jugadores.value,
                                    edad: edad.value,
                                    idioma_dependiente: idioma_dependiente.value,
                                    idioma: idioma.value,
                                    autores: autores.value,
                                    duracion: duracion.value,
                                    dimensiones: dimensiones.value,
                                    peso: peso.value,
                                    componentes: componentes.value,

                                } : null,
                                img: FbDownloadURL.map((img) => {
                                    return img
                                }),
                            })
                        }
                    }
                );
            }
            Promise.all(promises)
                .then(() => {
                    setButtonAceptarText(true);
                    setAlertShow(true);
                    setTimeout(() => {
                        setAlertShow(false);
                        handleReset();
                    }, 2173);
                })
                .catch(err => console.log(err.code));


        }
        else {
            alert('Debe completar todos los campos y agregar al menos una imágen.');
        }
    }
    return (
        <Modal {...props} style={{ background: 'none' }} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontWeight: 'bolder', color: '#606060' }}>
                    <h1 > Agregar Nuevo Producto</h1>
                </Modal.Title>
            </Modal.Header>
            {
                fbCategoria ?
                    <Modal.Body>
                        <Form onSubmit={submitProduct} id='myForm'>
                            <Form.Group controlId='formNameProducts'>
                                <Form.Label>Nombre:</Form.Label>
                                <Form.Control name='nombre' type='text' placeholder='Ingrese el nombre del producto.' required />
                            </Form.Group>
                            <Form.Group controlId="formDescriptionProducts">
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control name='descripcion' as="textarea" rows="3" placeholder='Ingrese la descripción del producto.' required />
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formCategory">
                                        <Form.Label>Categoría:</Form.Label>
                                        <Form.Control name='categoria' as="select"
                                            onChange={(categoria) => handleSubCategory(categoria.target.value)}
                                        >
                                            <option value='0' key='alfa'>Seleccione una categoría</option>
                                            {fbCategoria.map((categoria, i) => {
                                                return <option value={categoria} key={i}>{categoria}</option>
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    {subCat ?
                                        <Form.Group controlId="formSubCategory">
                                            <Form.Label>Sub-Categoría:</Form.Label>
                                            <Form.Control name='subcategoria' as="select">
                                                {/* Transformamos el hook subCat a array, ya que firebase lo entrega como Objeto, y se procede a recorrerlo. */
                                                    Object.entries(subCat).map(([abreviacion, nombre], i) => {
                                                        return <option value={nombre.description} key={i}>{nombre.description}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                        :
                                        <Form.Group controlId="formSubCategory" style={{ display: 'none' }}>
                                            <Form.Label>Sub-Categoría:</Form.Label>
                                            <Form.Control name='subcategoria' as="select">
                                                <option value={0} ></option>
                                            </Form.Control>
                                        </Form.Group>
                                    }
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formPriceProducts">
                                        <Form.Label>Precio:</Form.Label>
                                        <Form.Control name='precio' type="number" placeholder='Valor del producto.' required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formStockProducts">
                                        <Form.Label>Stock Web:</Form.Label>
                                        <Form.Control name='stock' type="number" placeholder='Stock online del producto.' required />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formVideoProducts">
                                        <Form.Label>Video:</Form.Label>
                                        <Form.Control name='video' type="string" placeholder='How To Play del producto.' required />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Group controlId='formUploadImages'>
                                <Form.Label>Imágenes:</Form.Label>
                                <div className={'custom-file'} style={{ marginBottom: '12px' }}>
                                    <input type="file" className={'custom-file-input'} id="customFile" onChange={orientImage} accept="image/*" multiple />
                                    <label className="custom-file-label" htmlFor="customFile">Buscar Imágen(es)</label>
                                </div>
                                { /* Consultamos que existan elementos en el hook image, y despues recorremos este */
                                    image ? (
                                        <div>
                                            <div className={productosStyles.containerImg}>
                                                {(image || []).map((url, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <div className={productosStyles.boxImg} key={i}>
                                                                <img src={url} alt="..." />
                                                                <div className={productosStyles.optionImg}>
                                                                    <button onClick={(e) => deleteImage(e, url)} className={productosStyles.deleteImg}>
                                                                        <svg className={productosStyles.svgX} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <ProgressBar variant="success" now={progress} />
                                        </div>
                                    )
                                        :
                                        null}
                            </Form.Group>
                            <p>¿Agregar Descripción y Detalle?</p>
                            <Form.Check
                                inline
                                checked={checked}
                                name={'control'}
                                type={'radio'}
                                id={`custom1`}
                                label={`Si`}
                                onChange={handleCheck}
                            />
                            <Form.Check
                                inline
                                checked={!checked}
                                name={'control'}
                                type={'radio'}
                                id={`custom2`}
                                label={`No`}
                                onChange={handleCheck}
                            />
                            {
                                checked ?
                                    <InformacionAdicionalProductos />
                                    :
                                    null
                            }
                            <Button type='submit' variant="success" block style={{ margin: '20px 0 0 0' }}>
                                {buttonAceptarText ? (<><i className="far fa-save fa-fw" />Aceptar</>) : (<Spinner animation="border" />)}
                            </Button>
                            {' '}
                            <Button variant="outline-secondary" onClick={handleReset} block>
                                <i className="fas fa-undo fa-fw" />
                            Reiniciar
                        </Button>
                            <br />
                            <Alert show={alertShow} variant={'success'} onClose={() => setAlertShow(false)} dismissible>
                                Producto creado con éxito!
                        </Alert>
                        </Form>
                    </Modal.Body>
                    :
                    <h3>Cargando...</h3>
            }
        </Modal>
    )
}

export default AgregarProducto;