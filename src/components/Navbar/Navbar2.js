import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #343a40;
    font-size: 20px;
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    
    &:hover {
      color: white;
    }
  }
`;

class NavBar extends Component {
  render() {
    return (
      <Styles>
        <Navbar fixed expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/"><a href="/">La Fortaleza</a></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Nav.Link>
                  <Link href="/">Home</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link href="/">Novedades</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link href="/">Lanzamientos</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link href="/">Ofertas</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link href="/">Calendario</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link href="/">Eventos</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <NavDropdown id="nav-dropdown-4" eventkey={4} title="Mas">
                  <NavDropdown.Item href="/">Juegos De Mesa</NavDropdown.Item>
                  <NavDropdown.Item href="/">Juegos De Cartas</NavDropdown.Item>
                  <NavDropdown.Item href="/">Modelos A Escala</NavDropdown.Item>
                  <NavDropdown.Item href="/">Coleccionables</NavDropdown.Item>
                  <NavDropdown.Item href="/">Comics</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item>
                <Nav.Link>
                  <Link href="/"><Button variant="light">Login</Button></Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link href="/"><Button variant="light">Registro</Button></Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles >
    )
  }
}

export default NavBar;