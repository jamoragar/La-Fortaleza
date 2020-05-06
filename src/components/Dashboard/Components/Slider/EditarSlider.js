import React, { useState } from 'react';
import { Spinner, Button, ProgressBar, Alert, Form, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import firebase from '../../../../config/firebase';
import sliderStyles from './Slider.module.scss';

const EditarSlider = () => {
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState([])
    let { id } = useParams();
    let { uid } = useParams();
    const [alertShow, setAlertShow] = useState(false);
    const [buttonAceptarText, setButtonAceptarText] = useState(true);
    const [progress, setProgress] = useState(0);
    let images = [];
    let fileArray = [];

    const orientImage = async ({ target }) => {
        images.push(target.files)
        setFiles(target.files)
        for (let i = 0; i < images[0].length; i++) {
            console.log(i);
            fileArray.push(URL.createObjectURL(images[0][i]));
        }
        setImage(await fileArray);
    }
    const deleteImage = (e, name) => {
        e.preventDefault();
        setImage(image.filter((image) => image !== name));
        handleReset();
    }

    const handleReset = () => {
        document.getElementById('myForm').reset();
        setImage(null);
    }

    const submitSlider = (e) => {
        e.preventDefault();
        const promises = [];
        const FbDownloadURL = [];
        if (files.length > 0 && id) {
            setButtonAceptarText(false)
            for (let i = 0; i < files.length; i++) {
                const uploadTask = firebase.storage().ref().child(`Slider/Sliders/${id.trim()}/slider${id.trim()}`).put(files[i])
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
                            firebase.database().ref().child(`/Slider/Main/slider${id}/`).update({
                                id: id,
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
        <div>
            <Form onSubmit={submitSlider} id='myForm'>
                <Form.Group controlId='formUploadImages'>
                    <Form.Label className={sliderStyles.fltext}>
                        <div className="row">
                            <div className="col text-center">
                                <h2 style={{ marginTop: '3rem', marginBottom: '3rem', fontWeight: 'bolder', color: '#606060' }}>
                                    Selecciona una imagen para reemplazar la imagen del Slider :  {id}
                                </h2>
                            </div>
                        </div>
                    </Form.Label>
                    <div className={'custom-file'} style={{ marginBottom: '12px' }}>
                        <input type="file" className={'custom-file-input'} id="customFile" onChange={orientImage} accept="image/*" multiple />
                        <label className="custom-file-label" htmlFor="customFile">Buscar Imágen</label>
                    </div>
                    {
                        image ? (
                            <div>
                                <div className={sliderStyles.containerImg}>
                                    {(image || []).map((url, i) => {
                                        return (
                                            <div key={i}>
                                                <div className={sliderStyles.boxImg} key={i}>
                                                    <img src={url} alt="..." />
                                                    <div className={sliderStyles.optionImg}>
                                                        <button onClick={(e) => deleteImage(e, url)} className={sliderStyles.deleteImg}>
                                                            <svg className={sliderStyles.svgX} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
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
                <Row>
                    <Col>
                        <Button type='submit' variant="success" block style={{ fontWeight: "bold" }}>
                            {buttonAceptarText ? (<><i className="far fa-save fa-fw" />Aceptar</>) : (<Spinner animation="border" />)}
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={handleReset} style={{ fontWeight: 'bold' }} block>
                            <i className="fas fa-undo fa-fw" />
                            Reiniciar
                        </Button>
                    </Col>
                    <Col>
                        <Link to={`/Dashboard/${uid}/Slider`} >
                            <Button variant="primary" block style={{ fontWeight: 'bold' }}>
                                <i className="fas fa-undo fa-fw" />
                            Volver
                    </Button>
                        </Link>
                    </Col>
                </Row>
                <br />
                <Alert show={alertShow} variant={'success'} onClose={() => setAlertShow(false)} style={{ fontWeight: 'bold' }} dismissible>
                    Imagen Subida con éxito!
                </Alert>
            </Form>
        </div >
    )
}

export default EditarSlider;