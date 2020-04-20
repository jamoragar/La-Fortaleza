import React, { useState, useEffect } from 'react';
import { formatPrice } from "../Data/DataProductos";
import { Spinner } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import firebase from '../../config/firebase';
import './Store.scss';


const Store = ({ fbData, categoriasProductos, orders, cart }) => {
    const [category, setCategory] = useState(null);
    const order = orders;
    // LLamado a firebase para obtener todo el nodo Category y poder trabajarlo
    useEffect(() => {
        firebase.database().ref('/Category').on('value', snapshot => {
            setCategory(snapshot.val());
        })
    }, []);

    const addNewProduct = (product) => {
        const newOrder = {
            title: product.nombre,
            description: product.categoria,
            price: product.precio
        }
        order.dispatch({
            type: 'ADD_ORDER',
            payload: newOrder
        })
    }

    const discountPrice = 0.10;

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
                {categoriasProductos.map((categoriaProducto, i) => {
                    return (
                        <div key={i}>
                            {/*Transformamos el nodo Category a array, y diferenciamos entre su valor (description) y el subnodo que contiene mas contenido, valga la redundancia...*/}
                            {Object.entries(category).map(([abreviacion, contenido], i) => {
                                return categoriaProducto === contenido.description ? (
                                    <a key={i} href={contenido.path}>
                                        <img
                                            alt="Banner"
                                            className="img-fluid"
                                            key={i}
                                            title="Modelos a Escala"
                                            src={contenido.banner}
                                        />
                                    </a>
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
                                                <div className="card" style={{ width: "285px", margin: '0 25px' }}>
                                                    <div className="offer offer-success">
                                                        <div className="shape">
                                                            <div className="shape-text">
                                                                -10%
					                                        </div>
                                                        </div>
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
                                                                <div className="col-6 text-center">
                                                                    <h5 className="text-success">
                                                                        {formatPrice(producto.precio - (producto.precio * discountPrice))}
                                                                    </h5>
                                                                </div>
                                                                <div className="col-6 text-center">
                                                                    <h5 className="text-muted">
                                                                        <s>{formatPrice(producto.precio)}</s>
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <div className="row mt-1">
                                                                <div className="col-6">
                                                                    <button
                                                                        style={{ outline: "none" }}
                                                                        className='btn-add btn-danger'
                                                                        onClick={() => addNewProduct(producto)}>
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