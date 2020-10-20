import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import firebase from "../../config/firebase";
import { Container, Spinner, Row, Col, Image } from "react-bootstrap";

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
        <Container
          style={{
            width: "80%",
            height: "100%",
            marginTop: "30px",
            borderColor: "#818182",
            boxShadow: "0 15px 25px 5px #818182",
            color: "#606060",
            paddingTop:"25px",
            paddingBottom: "25px"
          }}
        >
          <Row className="mt-5">
            <Col xs={12} md={8}>
              <Image alt="img" src={entrada.img}></Image>
            </Col>
            <Col xs={6} md={4}>
              <h2>{entrada.titulo}</h2>
              <h4>{entrada.subtitulo}</h4>
            </Col>
          </Row>
          <Row className="my-5">
            <text className="m-4">{entrada.parrafo1}</text>
            <text className="m-4">{entrada.parrafo2? entrada.parrafo2 : null}</text>
            <text className="m-4">{entrada.parrafo3? entrada.parrafo2 : null}</text>
            <text className="m-4">{entrada.parrafo4? entrada.parrafo2 : null}</text>
            <text className="m-4">{entrada.parrafo5? entrada.parrafo2 : null}</text>
            <text className="m-4">{entrada.parrafo6? entrada.parrafo2 : null}</text>
            <text className="m-4">{entrada.parrafo7? entrada.parrafo2 : null}</text>
          </Row>
          <Row >
            <Col>
              <Link to="/Blog">
              <div className="btn btn-outline-primary text-left">volver</div>
              </Link>
            </Col>
            <Col>
              <div className="text-right">
                <small>Autor-</small>
                {entrada.autor}
              </div>
            </Col>
          </Row>
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
