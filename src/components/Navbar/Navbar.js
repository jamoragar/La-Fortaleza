import React from 'react'
import { Nav, Navbar, NavDropdown, Button} from 'react-bootstrap';

import './Navbar.scss';

const NavBar = () => {
    return (
            <Navbar className="navbar" bg="dark" variant="light" expand="lg xs">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Novedades">Novedades</Nav.Link>
                        <Nav.Link href="/Lanzamientos">Lanzamientos</Nav.Link>
                        <Nav.Link href="/Ofertas">Ofertas</Nav.Link>
                        <Nav.Link href="/Calendar">Calendario</Nav.Link>
                        <Nav.Link href="/Eventos">Eventos</Nav.Link>
                        <NavDropdown title="Articulos" id="basic-nav-dropdown" variant="light">
                            <NavDropdown.Item href="/BG">Juegos De Mesa</NavDropdown.Item>
                            <NavDropdown.Item href="/TCG">Juegos De Cartas</NavDropdown.Item>
                            <NavDropdown.Item href="/Modelos">Modelos A Escala</NavDropdown.Item>
                            <NavDropdown.Item href="/Comics">Comics</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link href="/Login"><Button id='login' >Login</Button></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        
    )
}

export default NavBar

