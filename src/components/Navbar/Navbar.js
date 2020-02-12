import React from 'react'
import { Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
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
                    <Form className="ml-auto px-3 py-1" inline>
                        <FormControl type="text" placeholder="Buscar..." className="mr-sm-2" />
                        <Button variant="outline-light"> Buscar</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </NavbarContainer>
    )
}

export default NavBar

const NavbarContainer = styled.div`
    margin-bottom: 1rem;
    background: lightgray;
    font-size: 20px;
    .nav-link {
        color: #000 !important;
        
        }
    
    .dropdown-item {
        color: #000 !important;
        
        &:hover{
            color: white;
        }
    }
`;