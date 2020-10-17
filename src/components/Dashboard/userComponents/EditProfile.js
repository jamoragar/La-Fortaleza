import React, { useState, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Spinner,
  Overlay,
  Tooltip,
} from "react-bootstrap";
import firebase from "../../../config/firebase";
import { RegionesYcomunas } from "../../CheckOut/comunas";

const EditarPerfil = (props) => {
  const user = props.usuario;
  const [btnText, setBtnText] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const target = useRef(null);
    const [comuna, setComuna] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    setBtnText(true);
    const {
      name,
      last_name,
      email,
      number,
      password,
      address,
      comentario,
    } = e.target.elements;
    let uid = user.uid;
    firebase
      .database()
      .ref()
      .child("Users/" + uid)
      .update({
        uid: uid,
        nombre: name.value,
        apellido: last_name.value,
        numero: number.value,
        email: email.value,
        comuna: comuna,
        password: password.value,
        direccion: address.value,
        comentario: comentario.value,
      });
  };

 

  return (
    <div>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 style={{ fontWeight: "bolder", color: "#606060" }}>
              Editar Datos de Usuario: {`${user.nombre} ${user.apellido}`}
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUserName">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                name="name"
                type="text"
                defaultValue={user.nombre}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUserLastName">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                name="last_name"
                type="text"
                defaultValue={user.apellido}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUserAddress">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                name="address"
                type="text"
                defaultValue={user.direccion}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUsercomuna">
              <Form.Label>Comuna:</Form.Label>
              <Form.Control
                as="select"
                name="comuna"
                placeholder="Seleccione su comuna"
                onChange={(comuna) => setComuna(comuna.target.value)}
                required
              >
                  <option value='0' key='alfa'>{user.comuna? user.comuna : "Seleccione su comuna."}</option>
                {RegionesYcomunas.comunas.map((regycom, index) => {
                  return (
                    <option name="comuna" key={index} value={regycom}>
                      {regycom}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formUserEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                name="email"
                type="text"
                defaultValue={user.email}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Celular</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="number"
                  defaultValue={user.numero}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Comentario:</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={user.comentario}
                rows="3"
                name="comentario"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                defaultValue={user.password}
                name="password"
                required
              />
            </Form.Group>
            <Button
              style={{ marginBottom: ".5rem" }}
              variant="outline-success"
              ref={target}
              block
              type="submit"
            >
              {btnText ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Guardar Edición  "
              )}
              <i className="fas fa-save fa-fw" />
            </Button>
            <Overlay
              target={target.current}
              show={show}
              placement="top"
              onHide={() => setShow(false)}
              rootClose={true}
            >
              {(props) => {
                return (
                  <Tooltip
                    className="tooltip-error"
                    {...props}
                    show={props.show.toString()}
                  >
                    {message}
                  </Tooltip>
                );
              }}
            </Overlay>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditarPerfil;

