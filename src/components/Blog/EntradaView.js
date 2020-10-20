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
        <Container style={{width: "80%", marginTop: "30px",borderColor: "#818182",
                  boxShadow: "0 15px 25px 5px #818182",
                  minWidth: "285px",
                  color: "#606060"}}>

          <Row>
            <Col xs={12} md={8}>
              <Image alt="img" src={entrada.img} ></Image>
            </Col>
            <Col xs={6} md={4}>
              <h2>{entrada.titulo}</h2>
              <h4>{entrada.subtitulo}</h4>
            </Col>
          </Row>
          <Row className="my-5">
            <p className="mx-3">
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
