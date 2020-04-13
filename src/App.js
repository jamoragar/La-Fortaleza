import React, { useState, useEffect } from "react";
import Routes from "./components/Routes/Routes";
//Estilos
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from 'react-bootstrap';
//Componentes
import Header from "./components/Layouts/Header/Header";
import NavBar from "../src/components/Layouts/Navbar/Navbar";
import Footer from "./components/Layouts/Footer/Footer";
import firebase from './config/firebase';
//Hooks
import { useCart } from "./components/Hooks/useCart";
import { useOrders } from "./components/Hooks/useOrders";

function App(props) {
  console.log('rendering...')

  const [fbData, setFbData] = useState(null)
  const openCart = useCart();
  const orders = useOrders();

  useEffect(() => {
    firebase.database().ref('/Productos').on('value', snapshot => {
      setFbData(snapshot.val());

    });
  }, []);

  if (fbData) {
    return (
      <div className="App">
        <Header />
        <NavBar authenticated={props.authenticated} user={props.user} name={props.name} uid={props.uid} />
        <Routes fbData={fbData} openCart={openCart} orders={orders} />
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
