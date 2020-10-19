import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  ProgressBar,
  Alert,
  Spinner,
} from "react-bootstrap";
import firebase from "../../../../config/firebase";
import blogStyles from "./blog.module.scss";
import moment from 'moment';

const Blog = () => {
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [buttonAceptarText, setButtonAceptarText] = useState(true);
  const [alertShow, setAlertShow] = useState(false);
  const formRef = useRef(null);
  let images = [];
  let fileArray = [];

  const orientImage = async ({ target }) => {
    images.push(target.files);
    setFiles(target.files);
    for (let i = 0; i < images[0].length; i++) {
      fileArray.push(URL.createObjectURL(images[0][i]));
    }
    setImage(await fileArray);
  };

  const deleteImage = (e, name) => {
    e.preventDefault();
    setImage(image.filter((image) => image !== name));
  };

  const handleReset = () => {
    formRef.current.reset();
    setImage(null);
  };

  const submit = (e) => {
    e.preventDefault();
    const promises = [];
    const { titulo, subtitulo, cuerpo, autor } = e.target.elements;
    const FbDownloadURL = [];

    if (files.length > 0) {
      setButtonAceptarText(false);
      for (let i = 0; i < files.length; i++) {
        const uploadTask = firebase
          .storage()
          .ref()
          .child(
            `IMG/Blog/${titulo.value.trim()}/img_${titulo.value.trim()}_${i}`
          )
          .put(files[i]);
        promises.push(uploadTask);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (snapshot.state === firebase.storage.TaskState.RUNNING) {
              setProgress(progress);
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            FbDownloadURL.push(downloadURL);
            if (FbDownloadURL.length === files.length) {
              const key = firebase.database().ref().push().key;
              firebase
                .database()
                .ref()
                .child(`/Blog/${key}`)
                .set({
                  id: key,
                  autor: autor.value,
                  titulo: titulo.value,
                  subtitulo: subtitulo.value,
                  cuerpo: cuerpo.value,
                  fecha_creacion: moment().format("DD-MM-YYYY h:mm:ss a"),
                  img: FbDownloadURL.map((img) => {
                    return img;
                  }),
                });
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
        .catch((err) => console.log(err.code));
    } else {
      alert("Debe completar todos los campos y agregar al menos una imágen.");
    }
  };

  return (
    <div className="container-fluid m-5 w-75">
      <div className="text-center my-5" style={{ color: "#616169" }}>
        <h1>Blog La fortaleza</h1>
        <h3 className="my-5">Nueva entrada</h3>
      </div>
      <Form onSubmit={submit} id="myForm" ref={formRef}>
        <Form.Group controlId="formTitulo">
          <Row>
            <Col>
              <Form.Label>Titulo:</Form.Label>
              <Form.Control
                name="titulo"
                type="text"
                placeholder="Titulo de la entrada"
                required
              />
            </Col>
            <Col>
              <Form.Label>Sub Titulo:</Form.Label>
              <Form.Control
                name="subtitulo"
                type="text"
                placeholder="SubTitulo de la entrada"
                required
              />
            </Col>
            <Col>
              <Form.Label>Autor:</Form.Label>
              <Form.Control
                name="autor"
                type="text"
                placeholder="Autor de la entrada"
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formCuerpo">
          <Form.Label>Contenido de la entrada</Form.Label>
          <Form.Control name="cuerpo" as="textarea" rows={5} required />
        </Form.Group>
        <Form.Group controlId="formUploadImages">
          <Form.Label>Imágenes:</Form.Label>
          <div className={"custom-file"} style={{ marginBottom: "12px" }}>
            <input
              type="file"
              className={"custom-file-input"}
              id="customFile"
              onChange={orientImage}
              accept="image/*"
              multiple
              required
            />
            <label className="custom-file-label" htmlFor="customFile">
              Buscar Imágen
            </label>
          </div>
          {image ? (
            <div>
              <div className={blogStyles.containerImg}>
                {(image || []).map((url, i) => {
                  return (
                    <div key={i}>
                      <div className={blogStyles.boxImg} key={i}>
                        <img src={url} alt="..." />
                        <div className={blogStyles.optionImg}>
                          <button
                            onClick={(e) => deleteImage(e, url)}
                            className={blogStyles.deleteImg}
                          >
                            <svg
                              className={blogStyles.svgX}
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              role="presentation"
                            >
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <ProgressBar variant="success" now={progress} />
            </div>
          ) : null}
        </Form.Group>
        <Button
          type="submit"
          variant="success"
          block
          style={{ margin: "20px 0 0 0" }}
        >
          {buttonAceptarText ? (
            <>
              <i className="far fa-save fa-fw" />
              Aceptar
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </Button>{" "}
        <Button variant="outline-secondary" onClick={handleReset} block>
          <i className="fas fa-undo fa-fw" />
          Reiniciar
        </Button>
        <br />
        <Alert
          show={alertShow}
          variant={"success"}
          onClose={() => setAlertShow(false)}
          dismissible
        >
          Nueva entrada de Blog creada con éxito!
        </Alert>
      </Form>
    </div>
  );
};

export default Blog;
