import React from 'react';
import { Link } from 'react-router-dom';
//Api
import { Spinner } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
//Componentes
import Carousel from 'react-multi-carousel';
//Hooks
import { formatPrice } from "../Data/DataProductos";
//Styles
import './Store.scss';

const Store = (props) => {

    const { fbData, categoriaProductos, orders, category } = props;
    const order = orders;
    const discountPrice = 0;

    const addNewProduct = (product) => {

        const newOrder = {
            title: product.nombre,
            description: product.categoria,
            price: Math.ceil((product.precio - (product.precio * discountPrice))),
            stock: parseInt(product.stock),
            id: product.id
        }
        order.dispatch({
            type: 'ADD_ORDER',
            payload: newOrder
        })
    }


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1150 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1150, min: 580 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 580, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    if (fbData && category) {
        return (
            <div>
                {categoriaProductos.map((categoriaProducto, i) => {
                    return (
                        <div key={i}>
                            {/*Transformamos el nodo Category a array, y diferenciamos entre su valor (description) y el subnodo que contiene mas contenido, valga la redundancia...*/}
                            {Object.entries(category).map(([abreviacion, contenido], i) => {
                                return categoriaProducto === contenido.description ? (
                                    <Link key={i} to={`/Categoria/${contenido.description}`}>
                                        <img
                                            alt="Banner"
                                            className="img-fluid"
                                            key={i}
                                            title="Banner Categoria"
                                            src={contenido.banner}
                                        />
                                    </Link>
                                ) : null
                            })}
                            <Carousel
                                additionalTransfrom={0}
                                arrows
                                autoPlaySpeed={3000}
                                centerMode={false}
                                containerClass="container-with-dots"
                                autoPlay={3000}
                                draggable
                                focusOnSelect={false}
                                infinite={true}
                                keyBoardControl
                                minimumTouchDrag={80}
                                renderDotsOutside={false}
                                responsive={responsive}
                                showDots={false}
                                sliderClass="CarouselProduct"
                                slidesToSlide={1}
                                swipeable
                            >
                                {fbData.map((producto, j) => {
                                    return producto.categoria === categoriaProducto ? (
                                        <div key={j} className="card_product" >
                                            <div className="card">
                                                <div className="offer offer-success">
                                                    {/* Activar cuando hay descuento...
                                                        <div className="shape">
                                                        <div className="shape-text">
                                                            -10%
					                                    </div>
                                                    </div> */}
                                                    <img className="card-img" src={producto.img} alt={producto.nombre} style={{ width: "283px", height: "283px" }} />
                                                </div>
                                                <div className="card-header-store text-center">
                                                    <h5 className="card-title-style">{producto.nombre}</h5>
                                                </div>
                                                <div className="card-body-style">
                                                    <p className="card-text" >{producto.descripcion}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <h6 className="card-subtitle mb-2 text-muted">{producto.subcategoria}</h6>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="row mt-1">
                                                            <div className="col-12 text-center">
                                                                <h5 className="text-success">
                                                                    {formatPrice(parseInt(Math.ceil((producto.precio) - (producto.precio * discountPrice))))}
                                                                </h5>
                                                            </div>
                                                            {/* Activar cuando hay descuento...
                                                                <div className="col-6 text-center">
                                                                <h5 className="text-muted">
                                                                    <s>{formatPrice(producto.precio)}</s>
                                                                </h5>
                                                            </div> */}
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="row mt-1">
                                                            <div className="col-6">
                                                                <button
                                                                    style={{ outline: "none" }}
                                                                    className={`btn-add ${producto.stock === "0" ? 'btn-secondary' : 'btn-danger'}`}
                                                                    onClick={() => addNewProduct(producto)}
                                                                    disabled={producto.stock === "0" ? true:false }>
                                                                    <i className="fas fa-shopping-cart" />
                                                                        Comprar
                                                                    </button>
                                                            </div>
                                                            <div className="col-6 pl-1">
                                                                <a href={`/Articulo/${producto.id}`}>
                                                                    <button
                                                                        style={{ outline: "none" }}
                                                                        className="btn-ver btn-success"
                                                                    >
                                                                        <i className="fas fa-eye" />
                                                                            Ver
                                                                        </button>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                        :
                                        null
                                })}
                            </Carousel>
                        </div>

                    )
                })
                }
            </div>
        )

    } else {
        return (
            <div>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </div>
        )
    }
}

export default Store;