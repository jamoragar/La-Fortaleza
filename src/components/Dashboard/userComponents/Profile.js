import React, { useState } from "react";
import { Form, InputGroup, Container, Button, Col } from "react-bootstrap";
import EditProfile from "./EditProfile";

const Profile = (props) => {
  const data = props;
  const userData = data.props;
  const [showEditarUsuario, setShowEditarUsuario] = useState(false);
  const handleShowEditarUsuario = (data) => setShowEditarUsuario(true);
  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);

  return (
    <div>
      <div className="row">
        <div className="col text-center">
          <h1
            style={{
              marginTop: "3rem",
              marginBottom: "3rem",
              fontWeight: "bolder",
              color: "#606060",
            }}
          >
            Perfil de usuario
          </h1>
        </div>
      </div>
      <Container fluid>
        <Form>
          <Form.Row>
            <Col lg={6} xs={12}>
              <Form.Group>
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  defaultValue={userData.nombre}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col lg={6} xs={12}>
              <Form.Group>
                <Form.Label>Apellido(s)</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  defaultValue={userData.apellido}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col lg={6} xs={12}>
              <Form.Group>
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="email"
                  name="address"
                  defaultValue={userData.direccion}
                  readOnly
                />
                <Form.Text className="text-muted">
                  Nunca compartiremos su Dirección con nadie más.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col lg={6} xs={12}>
              <Form.Group>
                <Form.Label>Comuna</Form.Label>
                <Form.Control
                  type="text"
                  name="comuna"
                  defaultValue={userData.comuna? userData.comuna : "Aun no ha ingresado su comuna."}
                  readOnly
                />
                <Form.Text className="text-muted">
                  Nunca compartiremos su e-mail con nadie más.
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col lg={6} xs={12}>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={userData.email}
                  readOnly
                />
                <Form.Text className="text-muted">
                  Nunca compartiremos su e-mail con nadie más.
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col lg={6} xs={12}>
              <Form.Group>
                <Form.Label>Celular</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="number"
                    defaultValue={userData.numero}
                    readOnly
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Nunca compartiremos su Telefono con nadie más.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col lg={6} xs={12}>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type={shown ? "text" : "password"}
                  defaultValue={userData.password}
                  name="password"
                  readOnly
                />
                <Button
                  style={{ marginTop: "1rem" }}
                  onClick={() => switchShown()}
                >
                  {shown ? "Ocultar" : "Mostrar"}
                </Button>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group>
            <Form.Label>Comentario:</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={userData.comentario}
              rows="3"
              name="comentario"
              readOnly
            />
          </Form.Group>

          <Button onClick={handleShowEditarUsuario}>Editar Perfil</Button>
          {showEditarUsuario ? (
            <EditProfile
              style={{ background: "none" }}
              show={showEditarUsuario}
              onHide={() => setShowEditarUsuario(false)}
              usuario={data.props}
            />
          ) : null}
        </Form>
      </Container>
    </div>
  );
};

export default Profile;
