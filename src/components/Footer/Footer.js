import React, { Component } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  .footer-middle {
    background: #343a40;
    padding-top: 3rem;
    color: white;
  }

  .footer-bottom {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }

  ul li a {
    color: var(--mainGrey);
  }

  ul li a:hover {
    color: var(--mainLightGrey);
  }
`;

class Footer extends Component {
    render() {
        return (
            <FooterContainer fixed="bottom" className="main-footer">
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            {/* Column 1 */}
                            <div className="col-md-3 col-sm-6">
                                <h4>Informacion de la tienda</h4>
                                <ul className="list-unstyled">
                                    <li>Balmaceda 441</li>
                                    <li>Punta Arenas</li>
                                    <li>Telefono</li>
                                    <li>(61) 237 1498</li>
                                </ul>
                            </div>
                            {/* Column 2 */}
                            <div className="col-md-3 col-sm-6">
                                <h4>Productos</h4>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="/">Novedades</a>
                                    </li>
                                    <li>
                                        <a href="/">Ofertas</a>
                                    </li>
                                    <li>
                                        <a href="/">Pre-ventas</a>
                                    </li>
                                </ul>
                            </div>
                            {/* Column 3 */}
                            <div className="col-md-3 col-sm-6">
                                <h4>Nuestra Empresa</h4>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="/">Aviso Legal</a>
                                    </li>
                                    <li>
                                        <a href="/">Terminos Y Condiciones</a>
                                    </li>
                                    <li>
                                        <a href="/">Contacto</a>
                                    </li>
                                </ul>
                            </div>
                            {/* Column 4 */}
                            <div className="col-md-3 col-sm-6">
                                <h4>Mi Cuenta</h4>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="/">Informacion Personal</a>
                                    </li>
                                    <li>
                                        <a href="/">Pedidos</a>
                                    </li>
                                    <li>
                                        <a href="/">Mis Alertas</a>
                                    </li>
                                    <li>
                                        <a href="/">Whishlist</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Footer Bottom */}
                        <div className="footer-bottom">
                            <p className="text-xs-center">
                                &copy;{new Date().getFullYear()} Powered by <a href="http://smartapps.cl" target="blank">Smartapps</a> - All Rights
                                Reserved
              </p>
                        </div>
                    </div>
                </div>
            </FooterContainer>
        )
    }
}

export default Footer;