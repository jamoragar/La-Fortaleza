import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Spinner, ProgressBar, Col } from 'react-bootstrap';
import firebase from '../../../../config/firebase';
import categoriasStyles from './Categorias.module.scss'
import moment from 'moment';

const AgregarSubCategorias = (props) => {
    const fbDbCategory = firebase.database().ref('/Category');
    const [fbCategoria, setFbCategoria] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);
    const [Category, setCategory] = useState(null);
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState([]);
    const [alertShow, setAlertShow] = useState(false);
    const [buttonAceptarText, setButtonAceptarText] = useState(true);
    const [progress, setProgress] = useState(0);
    let descripciones = [];
    let images = [];
    let fileArray = [];
    let categoryToArray = [];

    //console.log(selectedCat);
    //console.log(fbCategoria);
    // console.log(categoryToArray);


    useEffect(() => {
        firebase.database().ref('/Category').on('value', snapshot => {
            setCategory(snapshot.val());
        });
    }, []);

    //hook que llama las descripciones de cada categoria.
    useEffect(() => {
        fbDbCategory.orderByChild('description').on('value', (snapshot) => {
            snapshot.forEach(child => {
                descripciones.push(child.val().description);
            });
            setFbCategoria(descripciones);
        })
    }, []);



    const orientImage = async ({ target }) => {
        images.push(target.files)
        setFiles(target.files)
        for (let i = 0; i < images[0].length; i++) {
            fileArray.push(URL.createObjectURL(images[0][i]));
        }
        setImage(await fileArray);
    }
    const deleteImage = (e, name) => {
        e.preventDefault();
        setImage(image.filter((image) => image !== name))

    }
    const handleReset = () => {
        document.getElementById('myForm').reset();
        setImage(null);
    }
    const submitCategory = (e) => {
        e.preventDefault();
        const promises = [];
        const { description, path, id } = e.target.elements;
        const FbDownloadURL = [];

        if (files.length > 0 && selectedCat !== 0 || Category) {
            Object.keys(Category).forEach((key, i) => {
                categoryToArray[i] = Category[key]
            });
            setButtonAceptarText(false)
            for (let i = 0; i < files.length; i++) {
                const uploadTask = firebase.storage().ref().child(`IMG/Categorias/categorias/${description.value.trim()}/img_${description.value.trim()}_${i}`).put(files[i])
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
                            //const key = firebase.database().ref().push().key;
                            const key = id.value;
                            firebase.database().ref().child(`/Category/${key}`).set({
                                id: id.value,
                                description: description.value.trim(),
                                path: path.value,
                                fecha_creacion: moment().format('DD-MM-YYYY h:mm:ss a'),
                                banner: FbDownloadURL.map((img) => {
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
                <Modal.Title>
                    Agregar Nueva Subcategoria
                </Modal.Title>
            </Modal.Header>
            {fbCategoria ?
                <Modal.Body>
                    <Form onSubmit={submitCategory} id='myForm'>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="formCategory">
                                    <Form.Label>Categoría:</Form.Label>
                                    <Form.Control name='categoria' as="select"
                                        onChange={(categoria) => setSelectedCat(categoria.target.value)}
                                    >
                                        <option value='0' key='alfa'>Seleccione una categoría</option>
                                        {fbCategoria.map((categoria, i) => {
                                            return <option value={categoria} key={i}>{categoria}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId='formNameId'>
                            <Form.Label>Id:</Form.Label>
                            <Form.Control name='id' type='text' placeholder='Ingrese el nombre del producto.' required />
                        </Form.Group>
                        <Form.Group controlId='formNameProducts'>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control name='description' type='text' placeholder='Ingrese el nombre del producto.' required />
                        </Form.Group>
                        <Form.Group controlId="formDescriptionProducts">
                            <Form.Label>Path:</Form.Label>
                            <Form.Control name='path' type='text' placeholder='Ingrese path.' required />
                        </Form.Group>
                        <Form.Group controlId='formUploadImages'>
                            <Form.Label>Imágenes:</Form.Label>
                            <div className={'custom-file'} style={{ marginBottom: '12px' }}>
                                <input type="file" className={'custom-file-input'} id="customFile" onChange={orientImage} accept="image/*" multiple />
                                <label className="custom-file-label" htmlFor="customFile">Buscar Imágen(es)</label>
                            </div>
                            {
                                image ? (
                                    <div>
                                        <div className={categoriasStyles.containerImg}>
                                            {(image || []).map((url, i) => {
                                                return (
                                                    <div key={i}>
                                                        <div className={categoriasStyles.boxImg} key={i}>
                                                            <img src={url} alt="..." />
                                                            <div className={categoriasStyles.optionImg}>
                                                                <button onClick={(e) => deleteImage(e, url)} className={categoriasStyles.deleteImg}>
                                                                    <svg className={categoriasStyles.svgX} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
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
                        {/*<Button type='submit' variant="success" block style={{ margin: '20px 0 0 0' }}>
                            {buttonAceptarText ? (<><i className="far fa-save fa-fw" />Aceptar</>) : (<Spinner animation="border" />)}
                                        </Button>*/}
                        {' '}
                        <Button variant="outline-secondary" onClick={handleReset} block>
                            <i className="fas fa-undo fa-fw" />
                            Reiniciar
                        </Button>
                        <br />
                        <Alert show={alertShow} variant={'success'} onClose={() => setAlertShow(false)} dismissible>
                            Categoria creada con éxito!
                        </Alert>
                    </Form>
                </Modal.Body>
                :
                <div> Cargando </div>
            }
        </Modal>
    )
}
export default AgregarSubCategorias;