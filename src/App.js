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


function App() {
  const [fbData, setFbData] = useState(null);
  const [fbSlider, setFbSlider] = useState(null);
  useEffect(() => {
    firebase.database().ref('/Productos').on('value', snapshot => {
      setFbData(snapshot.val());
    });
    firebase.database().ref('/Slider').on('value', snapshot => {
      setFbSlider(snapshot.val());
    });
  }, []);


  if (fbData && fbSlider) {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Routes fbData={fbData} fbSlider={fbSlider} />
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
