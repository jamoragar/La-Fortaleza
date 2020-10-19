import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardColumns,
  Col,
  Row,
  Image,
} from "react-bootstrap";
import firebase from "../../config/firebase";


// import { useBlog } from "../Hooks/useBlog";

const Blog = () => {
  //   const blog = useBlog();
  const [blog, setBlog] = useState(null);
  let blogToArray = [];

  useEffect(() => {
    firebase
      .database()
      .ref("/Blog")
      .on("value", (snapshot) => {
        setBlog(snapshot.val());
      });
  }, []);

  if (blog) {
    Object.keys(blog).forEach((key, i) => {
      blogToArray[i] = blog[key];
    });

    console.log(blogToArray);
    return (
      <div className="container my-5">
          <h1 class="display-1 text-center"><strong><em>Blog</em></strong></h1>
        <br/>
        <CardColumns>
          {Object.entries(blogToArray).map(([index, entrada], i) => {
            return (
              <Card key={i}>
                <Card.Img variant="top" src={entrada.img} />
                <Card.Body>
                  <Card.Title>{entrada.titulo}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {entrada.subtitulo}
                  </Card.Subtitle>
                  <p>{entrada.cuerpo}</p>
                  <Card.Text className="text-right">
                    - Autor {entrada.autor}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{entrada.fecha_creacion}</small>
                </Card.Footer>
              </Card>
            );
          })}
        </CardColumns>
      </div>
    );
  } else {
    return (
      <div
        align="center"
        style={{
          padding: "0",
          backgroundImage:
            "url(https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/WebImg%2Fstarbackgrpund.png?alt=media&token=aa5e367a-d8f8-4aa5-ac9c-c6f58469a0e1)",
        }}
      >
        <Row>
          <Col>
            <Image
              style={{ filter: "none", maxWidth: "55%" }}
              fluid
              src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/WebImg%2Fpagina%20en%20construccion.png?alt=media&token=d57ebc96-98b8-4b42-965a-695ec61adc9c"
              alt="CONSTRUCCION"
            />
          </Col>
        </Row>
        <Link to="/" style={{ color: "#606060" }}>
          <Image
            style={{ filter: "none", maxWidth: "45%" }}
            fluid
            src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/WebImg%2Fvolver.png?alt=media&token=19027575-1728-442e-ab9c-25ffe9da57a2"
            alt="vovler"
          />
        </Link>
      </div>
    );
  }
};

export default Blog;
