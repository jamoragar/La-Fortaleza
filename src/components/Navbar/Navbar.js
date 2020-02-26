import React from 'react'
import { Nav, Navbar, NavDropdown, Button} from 'react-bootstrap';
import styled from 'styled-components';

const NavBar = () => {
    return (
        <NavbarContainer>
            <Navbar bg="dark" variant="light" expand="lg xs">
                <Navbar.Brand href="/"><img
                    src="img/LogoS.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle bg="light" aria-controls="basic-navbar-nav" />
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
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/Comics">Comics</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link href="/Login"><Button id='login' variant='light'>Login</Button></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </NavbarContainer>
    )
}

export default NavBar

const NavbarContainer = styled.div`
    margin-bottom: 1rem;
    font-size: 20px;

    .nav-link {
        color: #ffffff !important;
        
        }
    .dropdown-divider {
        border-top: 1px solid #9E9E9E;
    }
    .dropdown-menu{
        background: #343a40;
    }
    .dropdown-item {
        background: #343a40;
        color: #ffffff !important;
        
        &:hover{
            color: white;
        }
    }
`;