import React from "react";
import Routes from "./components/Routes/Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../src/components/Layouts/Header/Header";
import NavBar from "../src/components/Layouts/Navbar/Navbar";
import Footer from "../src/components/Layouts/Footer/Footer";

function App() {

  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
