import React, { useState, useEffect } from "react";
import Routes from "./components/Routes/Routes";
//Estilos
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from 'react-bootstrap';
//Componentes
import Header from "./components/Layouts/Header/HeaderOld";
import Header2 from "./components/Layouts/Header/Header";
import Order from "./components/ShoppingCart/ShoppingCart";
import NavBar from "../src/components/Layouts/Navbar/Navbar";
import Footer from "./components/Layouts/Footer/Footer";
import firebase from './config/firebase';
import { useLocalState } from './components/Hooks/useLocalStorage';


function App(props) {
  const [fbData, setFbData] = useState(null)
  const [articulo, setArticulo] = useLocalState('');
  const [addCart, setAddCart] = useState();

  useEffect(() => {
    firebase.database().ref('/Productos').on('value', snapshot => {
      setFbData(snapshot.val());

    });
  }, []);

  console.log(articulo)

  if (fbData) {
    return (
      <div className="App">
        <Header2 />
        <NavBar authenticated={props.authenticated} user={props.user} name={props.name} uid={props.uid} />
        <Order addCart={addCart} />
        <Routes fbData={fbData} articulo={articulo} setArticulo={setArticulo} addCart={addCart} setAddCart={setAddCart} />
        <Footer />
      </div>
    );
  } else {
    return (
      <>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </>
    )
  }
}

export default App;
