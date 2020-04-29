import React from 'react';
import './Footer.scss';


const Footer = (props) => {
    return (
        <footer className="footer">
            <div className="container bottom_border">
                <div className="row">
                    <div className=" col-sm-4 col-md col-sm-4  col-12 col">
                        <h5 className="headin5_amrc col_white_amrc pt2">Contacto</h5>
                        <ul className="footer_ul_amrc">
                            <li><p><i className="fas fa-map-marker-alt fa-fw"></i>Balmaceda 441,<br />Punta Arenas.</p></li>
                            <li><p><i className="fas fa-phone fa-fw"></i>(61) 237 1498</p></li>
                            <li><p><i className="fab fa-whatsapp fa-fw"></i>+56 9 88198577</p></li>
                            <li><p><i className="fas fa-at fa-fw"></i>Lafortalezapuq@gmail.com</p></li>
                        </ul>
                    </div>
                    <div className=" col-sm-4 col-md  col-6 col">
                        <h5 className="headin5_amrc col_white_amrc pt2">Productos</h5>
                        <ul className="footer_ul_amrc">
                            <li><a href="/Novedades">Novedades</a></li>
                            <li><a href="/Ofertas">Ofertas</a></li>
                            <li><a href="/Preventa">Preventa</a></li>
                        </ul>
                    </div>
                    <div className=" col-sm-4 col-md  col-6 col">
                        <h5 className="headin5_amrc col_white_amrc pt2">Nuestra Empresa</h5>
                        <ul className="footer_ul_amrc">
                            <li><a href="/AvisoLegal">Aviso Legal</a></li>
                            <li><a href="/TerminosYCondicicones">Terminos Y Condiciones De Uso</a></li>
                            <li><a href="/Contacto">Contacto</a></li>
                        </ul>
                    </div>
                    <div className=" col-sm-4 col-md  col-12 col">
                        <h5 className="headin5_amrc col_white_amrc pt2">Mi Cuenta</h5>
                        <ul className="footer_ul_amrc">
                            <li><a href="/">Informacion Personal</a></li>
                            <li><a href="/">Pedidos</a></li>
                            <li><a href="/">Mis Alertas</a></li>
                            <li><a href="/">Whishlist</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <ul className="foote_bottom_ul_amrc">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/Servicios">Servicios</a></li>
                    <li><a href="/Blog">Blog</a></li>
                    <li><a href="/Contacto">Contacto</a></li>
                </ul>
                <p className="text-center">&copy;{new Date().getFullYear()} Powered by <a href="http://smartapps.cl" target="blank">Smartapps</a> - All Rights Reserved</p>
                <p className="text-center">Siguenos</p>
                <ul className="social_footer_ul">
                    <li><a href="https://www.facebook.com/fortalezapuntaarenas" target="blank"><span style={{ fontSize: "2em", color: "#3b5998" }}><i className="fab fa-facebook-square"></i></span></a></li>
                    <li><a href="https://www.instagram.com/la_fortaleza_puq/" target="blank"><span style={{ fontSize: "2em", color: "#e83e8c" }}><i className="fab fa-instagram"></i></span></a></li>
                    <li><a href="https://www.facebook.com/fortalezapuntaarenas" target="blank"><span style={{ fontSize: "2em", color: "#00acee" }}><i className="fab fa-twitter"></i></span></a></li>
                    <li><a href="https://api.whatsapp.com/send?phone=56988198577&text=Hola,%20Me%20gustaria%20hacer%20una%20consulta.(enviado%20desde%20LaFortaleza.cl)" target="blank"><span style={{ fontSize: "2em", color: "#00bb2d" }}><i className="fab fa-whatsapp"></i></span></a></li>
                    <li><a href="https://g.page/fortalezapuuq?gm" target="blank"><span style={{ fontSize: "2em", color: "#db4a39" }}><i className="fab fa-google"></i></span></a></li>
                </ul>
            </div>
        </footer >
    )
}

export default Footer;