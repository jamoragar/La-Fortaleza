import React, { useState, useRef } from "react";
import firebase from "../../config/firebase";
import "./Register.css";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Spinner,
  Overlay,
  Tooltip,
  Row,
  Col,
} from "react-bootstrap";
import Login from "../Login/Login";
import {RegionesYcomunas} from "../CheckOut/comunas";

const Register = (props) => {
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [btnText, setBtnText] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [comuna, setComuna] = useState(null);
  const target = useRef(null);

  console.log(comuna)

  const onRegisterSubmit = (e) => {
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

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((user) => {
        console.log(user);
        setBtnText(false);
        firebase.auth().currentUser.updateProfile({
          displayName: name.value,
        });
        let uid = user.user.uid;
        firebase
          .database()
          .ref()
          .child("Users/" + uid)
          .set({
            uid: uid,
            type: "client",
            nombre: name.value,
            apellido: last_name.value,
            numero: `+56 ${number.value}`,
            email: email.value,
            password: password.value,
            direccion: address.value,
            comuna: comuna,
            comentario: comentario.value,
          });
        props.onHide();
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          setBtnText(false);
          setMessage("El e-mail que ha ingresado ya se encuentra en uso.");
          setShow(true);
          setTimeout(() => setShow(false), 3000);
        } else if (error.code === "auth/invalid-email") {
          setBtnText(false);
          setMessage(
            "No puede iniciar sesión sin antes ingresar sus credenciales."
          );
          setShow(true);
          setTimeout(() => setShow(false), 3000);
        } else if (error.code === "auth/user-not-found") {
          setBtnText(false);
          setMessage(
            "Usuario no encontrado, verifique sus credenciales e intente nuevamente."
          );
          setShow(true);
          setTimeout(() => setShow(false), 3000);
        } else if (error.code === "auth/wrong-password") {
          setBtnText(false);
          setMessage("E-mail o password incorrecto.");
          setShow(true);
          setTimeout(() => setShow(false), 3000);
        }
      });
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Ingrese sus datos para registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onRegisterSubmit}>
            <Form.Group>
              <Form.Label>Nombre(s):</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                name="name"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido(s):</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su Apellido"
                name="last_name"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su e-mail"
                name="email"
                required
              />
              <Form.Text className="text-muted">
                Nunca compartiremos su e-mail con nadie más.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  {" "}
                  <Form.Label>Dirección:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su Dirección"
                    name="address"
                    required
                  />
                  <Form.Text className="text-muted">
                    Nunca compartiremos su Dirección con nadie más.
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Label>Comuna:</Form.Label>
                  <Form.Control
                    as="select"
                    name="comuna"
                    onChange={(comuna) => setComuna(comuna.target.value)}
                    required
                  >
                    <option value="0" key="alfa">
                     Seleccione su comuna...
                    </option>
                    {RegionesYcomunas.comunas.map((regycom, index) => {
                      return (
                        <option name="comuna" key={index} value={regycom}>
                          {regycom}
                        </option>
                      );
                    })}
                  </Form.Control>

                  <Form.Text className="text-muted"></Form.Text>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>Celular:</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>+56</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="phone"
                  placeholder="Ingrese su Nro. telefónico"
                  name="number"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Comentario:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese Comentario"
                rows="3"
                name="comentario"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                required
              />
            </Form.Group>
            <Button variant="success" ref={target} type="submit">
              {btnText ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Registrarse"
              )}
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
            <Button
              style={{ margin: "0 0 0 15px" }}
              variant="danger"
              onClick={props.onHide}
            >
              Salir
            </Button>
          </Form>
        </Modal.Body>
        <div className="modal_footer">
          <div className="text-center">
            ¿Ya tienes cuenta con nostros?{" "}
            <div
              className="register_click_aqui"
              onClick={() => {
                setModalLoginShow(true);
                props.onHide();
              }}
            >
              Click Aquí
            </div>
          </div>
        </div>
      </Modal>
      <Login show={modalLoginShow} onHide={() => setModalLoginShow(false)} />
    </>
  );
};

export default Register;
