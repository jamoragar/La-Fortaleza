import React from 'react';
import './Header.scss';

const Header2 = (props) => {
    return (
        <div className="container-fluid-header">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <img className="img-logo pl-5" alt="Logo-La-Fortaleza" src="img/Logos.png" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    hola
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="col" style={{ paddingTop: "2rem" }}>
                        <div className="container h-100">
                            <div className="d-flex justify-content-center h-100">
                                <div className="searchbar">
                                    <input className="search_input" type="text" name="" placeholder="¿Qué estas buscando?" />
                                    <a href="/" className="search_icon"><i className="fas fa-search"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center ">
                            <a href="https://www.facebook.com/fortalezapuntaarenas" target="blank"><span style={{ fontSize: "2em", color: "#3b5998" }}><i className="fab fa-facebook-square px-3"></i></span></a>
                            <a href="https://www.instagram.com/la_fortaleza_puq/" target="blank"><span style={{ fontSize: "2em", color: "#e83e8c" }}><i className="fab fa-instagram px-3"></i></span></a>
                            <a href="https://www.facebook.com/fortalezapuntaarenas" target="blank"><span style={{ fontSize: "2em", color: "#00acee" }}><i className="fab fa-twitter px-3"></i></span></a>
                            <a href="https://api.whatsapp.com/send?phone=56988198577&text=Hola,%20Me%20gustaria%20hacer%20una%20consulta.(enviado%20desde%20LaFortaleza.cl)" target="blank"><span style={{ fontSize: "2em", color: "#00bb2d" }}><i class="fab fa-whatsapp px-3"></i></span></a>
                            <a href="https://g.page/fortalezapuuq?gm" target="blank"><span style={{ fontSize: "2em", color: "#db4a39" }}><i class="fab fa-google px-3"></i></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header2;