import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #343a40;
    font-size: 25px;
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    
    &:hover {
      color: white;
    }
  }
`;

export const NavBar = () => (
  <Styles>
    <Navbar expand="lg" bg="dark">
      <Navbar.Brand href="/"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-auto">
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
      </Navbar.Collapse>
    </Navbar>
  </Styles >
)  