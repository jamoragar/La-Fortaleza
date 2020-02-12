import React from 'react'
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';
import styled from 'styled-components';

const NavBar = () => {
    return (
        <NavbarContainer>
            <Navbar expand="lg xs">
                <Navbar.Brand href="/"><img
                    src="img/LogoS.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">Novedades</Nav.Link>
                        <Nav.Link href="/">Lanzamientos</Nav.Link>
                        <Nav.Link href="/">Ofertas</Nav.Link>
                        <Nav.Link href="/">Calendario</Nav.Link>
                        <Nav.Link href="/">Eventos</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown" variant="light">
                            <NavDropdown.Item href="/">Juegos De Mesa</NavDropdown.Item>
                            <NavDropdown.Item href="/">Juegos De Cartas</NavDropdown.Item>
                            <NavDropdown.Item href="/">Modelos A Escala</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Comics</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </NavbarContainer>
    )
}

export default NavBar

const NavbarContainer = styled.div`
    margin-bottom: 1rem;
    background: #343a40;
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