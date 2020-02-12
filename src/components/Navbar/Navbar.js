import React from 'react'
import styled from 'styled-components';
import Logo from './Logo.png';

const Navbar = () => {
    return (
        <NavbarContainer>
            <nav className="navbar navbar-expand-lg navbar-light px-3 py-0">
                <a className="navbar-brand" href="/">
                    <img style={{ width: "50px" }} src={Logo} alt="Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home<span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Novedades</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Lanzamientos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Ofertas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Calendario</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Eventos</a>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <a href="/"  className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Mas</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="/">Juegos De Mesa</a>
                                <a className="dropdown-item" href="/">Juegos De Cartas</a>
                                <a className="dropdown-item" href="/">Modelos A Escala</a>
                                <a className="dropdown-item" href="/">Coleccionables</a>
                                <a className="dropdown-item" href="/">Comics</a>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li>aa</li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </nav>
        </NavbarContainer>
    )
}

export default Navbar

const NavbarContainer = styled.div`
    background: lightgray;
    .nav-link {
        color: #000 !important;
        &:hover {
            background: var(---light-green);
        }
    }
`;