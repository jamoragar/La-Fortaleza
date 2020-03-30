import React, { useState, useEffect } from "react";
import Routes from "./components/Routes/Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../src/components/Layouts/Header/Header";
import NavBar from "../src/components/Layouts/Navbar/Navbar";
import Footer from "../src/components/Layouts/Footer/Footer";
import firebase from './config/firebase';


function App() {
  const [fbData, setFbData] = useState(null)
  useEffect(() => {
    firebase.database().ref('/Productos').on('value', snapshot => {
      setFbData(snapshot.val());

    });
  }, []);


  if (fbData) {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Routes fbData={fbData} />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>Cargando...</div>
    )
  }
}

export default App;
