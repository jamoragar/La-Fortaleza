import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './Header.scss';
import { useSearch } from "../../Hooks/useSearch";


const Header = () => {
    const Search = useSearch();
    const Buscar = { ...Search };
    const { keySearch, setKeySearch } = Buscar;

    const submitSearch = (e) => {
        e.preventDefault();
        const { search } = e.target.elements;
        setKeySearch(search.value);
        console.log(`log de buscador ${keySearch}`);
    }

    return (
        <div className="container-fluid-header">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <img className="img-logo pl-5" alt="Logo-La-Fortaleza" src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Logos%2FLogoS.png?alt=media&token=e179109f-80b0-48cd-b8cd-750ab6396ec7" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="col" style={{ paddingTop: "2rem" }}>
                        <div className="container h-100">
                            <Form className="d-flex justify-content-center h-100" id='myForm' onSubmit={submitSearch}>
                                <Form.Group className="searchbar">
                                    <Form.Control className="search_input" name='search' type='text' autoComplete="off" placeholder="¿Qué estas buscando?" required />
                                    <Button className="search_icon" type='submit'>
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center ">
                            <a href="https://www.facebook.com/fortalezapuntaarenas" target="blank"><span style={{ fontSize: "2em", color: "#3b5998" }}><i className="fab fa-facebook-square px-3"></i></span></a>
                            <a href="https://www.instagram.com/la_fortaleza_puq/" target="blank"><span style={{ fontSize: "2em", color: "#e83e8c" }}><i className="fab fa-instagram px-3"></i></span></a>
                            <a href="https://www.facebook.com/fortalezapuntaarenas" target="blank"><span style={{ fontSize: "2em", color: "#00acee" }}><i className="fab fa-twitter px-3"></i></span></a>
                            <a href="https://api.whatsapp.com/send?phone=56988198577&text=Hola,%20Me%20gustaria%20hacer%20una%20consulta.(enviado%20desde%20LaFortaleza.cl)" target="blank"><span style={{ fontSize: "2em", color: "#00bb2d" }}><i className="fab fa-whatsapp px-3"></i></span></a>
                            <a href="https://g.page/fortalezapuuq?gm" target="blank"><span style={{ fontSize: "2em", color: "#db4a39" }}><i className="fab fa-google px-3"></i></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header;