import React, { useState, useEffect } from "react";
import { LogOut } from '../../../config/firebase';
import Register from '../../Register/Register';
import Login from '../../Login/Login';
import firebase from '../../../config/firebase';
import './Navbar.scss'

const NavBar = (props) => {
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [fbCat, setFbCat] = useState(null);
  const catToArray = [];

  useEffect(() => {
    firebase.database().ref('/Category').on('value', snapshot => {
      setFbCat(snapshot.val());
    });
  }, []);

  if (fbCat) {
    Object.keys(fbCat).forEach((key, i) => {
      catToArray[i] = fbCat[key]
    });

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/"><i className="fab fa-fort-awesome fa-2x"></i></a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/"><i className="fas fa-home fa-fw"></i>Inicio <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={`/Categoria/${catToArray[6].description}`}><i className="fas fa-bolt fa-fw"></i>Preventa</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Ofertas"><i className="fas fa-hand-holding-usd fa-fw"></i>Ofertas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Eventos"><i className="fas fa-calendar-alt fa-fw"></i>Eventos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Blog"><i className="fas fa-pencil-alt fa-fw"></i>Blog</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-align-justify fa-fw"></i>
              Categorias
            </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href={`/Categoria/${catToArray[4].description}`}>Juegos De Mesa</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href={`/Categoria/${catToArray[3].description}`}>Juegos De Cartas</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href={`/Categoria/${catToArray[0].description}`}>Accesorios</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href={`/Categoria/${catToArray[1].description}`}>Armables</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href={`/Categoria/${catToArray[2].description}`}>Comics</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href={`/Categoria/${catToArray[5].description}`}>Juegos De Rol</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href={`/Categoria/${catToArray[7].description}`}>X-Wing</a>
              </div>
            </li>
          </ul>
          {props.authenticated ?
            <nav className="basic-navbar-nav" >
              <div className="mr-auto" />
              <div className="btn-group">
                <button type="button" className="btn btn-warning" style={{ fontWeight: "bold", color: "#606060" }} >Bienvenido(a) {props.name}</button>
                <button type="button" className="btn btn-warning dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="sr-only"></span>
                </button>
                <div className="dropdown-menu " style={{ fontWeight: "bold", color: "#606060", marginTop: "14px", marginLeft: "83px" }} >
                  <a className="dropdown-item" style={{ fontWeight: "bold", color: "#606060" }} href={`/dashboard/${props.uid}`}>Perfil</a>
                  <a className="dropdown-item" style={{ fontWeight: "bold", color: "#606060" }} href="/" onClick={() => LogOut()}>Salir</a>
                </div>
              </div>
            </nav>
            :
            <nav className="basic-navbar-nav" >
              <div className="mr-auto" />
              <div className="button-Toolbar" style={{ fontWeight: "bold" }} >
                <button style={{ fontWeight: "bold", color: "#606060" }} onClick={() => setModalRegisterShow(true)}>Registarse</button>
                <button style={{ fontWeight: "bold", color: "#606060" }} onClick={() => { setModalLoginShow(true) }}>Login</button>
              </div>

            </nav>
          }
          <Register show={modalRegisterShow} onHide={() => setModalRegisterShow(false)} />
          <Login show={modalLoginShow} onHide={() => { setModalLoginShow(false) }} />
        </div>
      </nav>
    );
  } else {
    return null
  }
};

export default NavBar;
