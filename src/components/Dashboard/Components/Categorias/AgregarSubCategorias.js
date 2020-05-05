import React, { useState } from 'react';
import { Form, Button, Modal, Alert, Spinner, ProgressBar, Col } from 'react-bootstrap';
import firebase from '../../../../config/firebase';
import categoriasStyles from './Categorias.module.scss'
import moment from 'moment';

const AgregarSubCategorias = (props) => {
    const catinfo = props;
    let catInfoToArray = [];
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState([]);
    const [alertShow, setAlertShow] = useState(false);
    const [buttonAceptarText, setButtonAceptarText] = useState(true);
    const [progress, setProgress] = useState(0);
    let images = [];
    let fileArray = [];


    Object.keys(catinfo).forEach((key, i) => {
        catInfoToArray[i] = catinfo[key]
    });

    console.log(catInfoToArray[2].id);

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

        if (files.length > 0 && catinfo) {
            setButtonAceptarText(false)
            for (let i = 0; i < files.length; i++) {
                const uploadTask = firebase.storage().ref().child(`IMG/Categorias/subcategorias/${description.value.trim()}/img_${description.value.trim()}_${i}`).put(files[i])
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
                            firebase.database().ref().child(`/Category/${catInfoToArray[2].id}/subCat/${key}`).set({
                                id: id.value,
                                description: description.value.trim(),
                                path: path.value,
                                fecha_creacion: moment().format('DD-MM-YYYY h:mm:ss a'),
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
                <Modal.Title>
                    Agregar Nueva SubCategoria en:  {catInfoToArray[2].description}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitCategory} id='myForm'>
                    <Form.Group controlId='formIdProducts'>
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
                        Categoria creada con éxito!
                        </Alert>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default AgregarSubCategorias;