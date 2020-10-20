import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../config/firebase";
import { Container, Spinner, Row, Col,Image } from "react-bootstrap";

const EntradaView = (props) => {
  let { id } = useParams();
  const [entrada, setEntrada] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`/Blog/${id}`)
      .on("value", (snapshot) => {
        setEntrada(snapshot.val());
      });
  }, []);

  if (entrada) {
    return (
      <>
        <Container style={{width: "60%", marginTop: "30px"}}>

          <Row>
            <Col xs={12} md={8}>
              <Image alt="img" src={entrada.img} ></Image>
            </Col>
            <Col xs={6} md={4}>
              <h1>{entrada.titulo}</h1>
              <h4>{entrada.subtitulo}</h4>
            </Col>
          </Row>
          <Row className="my-5">
            <p>
                {entrada.cuerpo}
            </p>
          </Row>
    <div className="text-right"><small>Autor-</small>{entrada.autor}</div>
        </Container>
      </>
    );
  } else {
    return (
      <div>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </div>
    );
  }
};

export default EntradaView;
