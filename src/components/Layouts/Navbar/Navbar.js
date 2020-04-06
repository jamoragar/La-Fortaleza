import React, { useState } from "react";
import { LogOut } from '../../../config/firebase';
import Register from '../../Register/Register';
import Login from '../../Login/Login';
import './Navbar.scss'


const NavBar = (props) => {
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            <a className="nav-link" href="/Preventa"><i className="fas fa-bolt fa-fw"></i>Preventa</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/"><i className="fas fa-hand-holding-usd fa-fw"></i>Ofertas</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/"><i className="fas fa-calendar-alt fa-fw"></i>Eventos</a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="¿Qué estas buscando?" aria-label="Search" />
          <button className="btn" type="submit">Buscar</button>
        </form>
        {props.authenticated ?
          <nav className="basic-navbar-nav" >
            <div className="mr-auto" />
            <div className="btn-group">
              <button type="button" className="btn btn-warning">Bienvenido(a) {props.name}</button>
              <button type="button" className="btn btn-warning dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href={`/dashboard/${props.uid}`}>Perfil</a>
                <a className="dropdown-item" href="/" onClick={() => LogOut()}>Salir</a>
              </div>
            </div>
          </nav>
          :
          <nav className="basic-navbar-nav" >
            <div className="mr-auto" />
            <button className="button-Toolbar"  >
              <button onClick={() => setModalRegisterShow(true)}>Registarse</button>
              <button onClick={() => { setModalLoginShow(true) }}>Login</button>
            </button>

          </nav>
        }
        <Register show={modalRegisterShow} onHide={() => setModalRegisterShow(false)} />
        <Login show={modalLoginShow} onHide={() => { setModalLoginShow(false) }} />
      </div>
    </nav >
  );
};

export default NavBar;
