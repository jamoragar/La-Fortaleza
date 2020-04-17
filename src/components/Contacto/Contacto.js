import React from 'react';

import './Contacto.scss';

const Contacto = () => {
    return (
        <div className="container">
            <div className="row mx-2 my-5" style={{ borderColor: "#818182", boxShadow: "0 15px 25px 5px #818182", minWidth: "285px" }}>
                <div className="col-lg-6 col-sm-12" style={{ background: "#ffc107", color: "#606060", fontWeight: "bold" }}>
                    <h3 className="text-center mt-5 mb-5">Contáctanos</h3>
                    <p className="text-center mt-5"><i className="fas fa-map-marker-alt fa-fw"></i>
                        Balmaceda 441,
                      <br />
                        Punta Arenas.
                    </p>
                    <p className="text-center"><i className="fas fa-phone fa-fw"></i>
                      (61) 237 1498
                    </p>
                    <p className="text-center"><i className="fab fa-whatsapp fa-fw"></i>
                      +56 9 88198577
                    </p>
                    <p className="text-center mb-5"><i className="fas fa-at fa-fw"></i>
                      Lafortalezapuq@gmail.com
                    </p>
                </div>
                <div className="col-lg-6 col-sm-12 text-center" style={{ background: "rgba(81, 81, 82, 0.25)", color: "#606060", fontWeight: "bold" }}>
                    <h3 className="text-center mt-5 mb-5">Síguenos En Nuestras Redes</h3>
                    <a href="https://www.facebook.com/fortalezapuntaarenas" target="blank"><span style={{ fontSize: "5em", color: "#3b5998" }}><i className="fab fa-facebook-square p-2"></i></span></a>
                    <a href="https://www.instagram.com/la_fortaleza_puq/" target="blank"><span style={{ fontSize: "5em", color: "#e83e8c" }}><i className="fab fa-instagram p-2"></i></span></a>
                    <a href="https://www.facebook.com/fortalezapuntaarenas" target="blank"><span style={{ fontSize: "5em", color: "#00acee" }}><i className="fab fa-twitter p-2"></i></span></a>
                    <a href="https://api.whatsapp.com/send?phone=56988198577&text=Hola,%20Me%20gustaria%20hacer%20una%20consulta.(enviado%20desde%20LaFortaleza.cl)" target="blank"><span style={{ fontSize: "5em", color: "#00bb2d" }}><i className="fab fa-whatsapp p-2"></i></span></a>
                    <a href="https://g.page/fortalezapuuq?gm" target="blank"><span style={{ fontSize: "5em", color: "#db4a39" }}><i className="fab fa-google p-2"></i></span></a>
                </div>

            </div>
        </div>
    )
}
export default Contacto;
