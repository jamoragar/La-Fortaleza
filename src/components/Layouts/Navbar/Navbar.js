import React from "react";
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import './Navbar.scss'

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="/"><i class="fab fa-fort-awesome fa-2x"></i></a>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/"><i class="fas fa-home fa-fw"></i>Inicio <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/"><i class="fas fa-bolt fa-fw"></i>Preventa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/"><i class="fas fa-hand-holding-usd fa-fw"></i>Ofertas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/"><i class="fas fa-calendar-alt fa-fw"></i>Eventos</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="¿Qué estas buscando?" aria-label="Search" />
          <button class="btn" type="submit">Buscar</button>
        </form>
      </div>
    </nav>
    // <Navbar className="navbar" bg="dark" expand="lg xs">
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse className="nav-icon" id="basic-navbar-nav">
    //     <Nav className="mr-auto">
    //       <Nav.Link href="/">Home</Nav.Link>
    //       <Nav.Link href="/Preventa">Preventa</Nav.Link>
    //       <Nav.Link href="/Ofertas">Ofertas</Nav.Link>
    //       <Nav.Link href="/Eventos">Eventos</Nav.Link>
    //       <NavDropdown
    //         title="Articulos"
    //         id="basic-nav-dropdown"
    //         variant="light"
    //       >
    //         <NavDropdown.Item href="/BoardingGames">
    //           Juegos De Mesa
    //         </NavDropdown.Item>
    //         <NavDropdown.Item href="/Rolgames">Juegos De Rol</NavDropdown.Item>
    //         <NavDropdown.Item href="/TraidingCardsGames">
    //           Juegos De Cartas
    //         </NavDropdown.Item>
    //         <NavDropdown.Item href="/Armables">
    //           Armables
    //         </NavDropdown.Item>
    //         <NavDropdown.Item href="/Comics">Comics</NavDropdown.Item>
    //         <NavDropdown.Item href="/X-Wings">X-Wing</NavDropdown.Item>
    //       </NavDropdown>
    //     </Nav>
    //     <Nav>
    //       <Nav.Link href="/Login">
    //         <Button id="login" variant="outline-light">
    //           Login
    //         </Button>
    //       </Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
  );
};

export default NavBar;
