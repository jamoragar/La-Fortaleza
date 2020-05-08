import React, { useState, useEffect } from 'react';
import { formatPrice } from '../Data/DataProductos';
import firebase from '../../config/firebase';
import { useOrders } from '../Hooks/useOrders';
import { useCart } from '../Hooks/useCart';
import { Spinner } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import CarritoCompra from '../CarritoCompra/CarritoCompra';
import './ArticulosDialogs.scss';
import { useParams } from 'react-router-dom';

const ArtciculosDialogs = (props) => {
    const [productView, setProductView] = useState();
    const orders = useOrders();
    const cart = useCart();
    let productViewToArray = [];

    let { id } = useParams();

    useEffect(() => {
        firebase.database().ref('/Productos').on('value', snapshot => {
            setProductView(snapshot.val());
        });
    }, []);

    const addNewProduct = (product) => {
        const newOrder = {
            title: product.nombre,
            description: product.categoria,
            price: product.precio
        }
        orders.dispatch({
            type: 'ADD_ORDER',
            payload: newOrder
        })
    }

    const selectId = id;
    console.log(selectId);


    if (selectId && productView) {
        Object.keys(productView).forEach((key, i) => {
            productViewToArray[i] = productView[key]
        });

        productViewToArray = productViewToArray.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item], []
        );


        const productosView = productViewToArray;
        const discountPrice = 0.10;
        return (
            <div>
                <CarritoCompra {...cart} {...orders} authenticated={props.isAuthed} uid={props.uid} />
                {Object.entries(productosView).map(([abreviacion, contenido], i) => {
                    console.log(selectId === contenido.id ? contenido : '')
                    return selectId === contenido.id ? (
                        <div key={i} className="container p-3 mt-5 mb-5">
                            <div className="row"
                                style={{
                                    borderColor: "#818182",
                                    boxShadow: "0 15px 25px 5px #818182",
                                    minWidth: "285px",
                                    color: "#606060",
                                }}>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 inline-block p-3 " >
                                    <img className="card-img px-1 py-3" alt="ProdcutoImg" src={contenido.img}></img></div>
                                <div className="col ">
                                    <div className="row">
                                        <div className="col " >
                                            <div className='fluid p-3' style={{ fontWeight: "bold", fontSize: "20px" }}>
                                                {contenido.nombre}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col ">
                                            <div className="col pt-3">
                                                <h4>Categoria: </h4><h5>{contenido.categoria}</h5>
                                                <br />
                                                <h4>Subcategoria: </h4><h5>{contenido.subcategoria}</h5>
                                            </div>
                                        </div>
                                        <div className="col pt-1">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item ">
                                                    <h4>Precio:</h4>
                                                </li>
                                                <li className="list-group-item ">
                                                    <h5 className="text-muted">
                                                        Antes <s>{formatPrice(contenido.precio)}</s>
                                                    </h5>
                                                </li>
                                                <li className="list-group-item ">
                                                    <h5 className="text-success">
                                                        Ahora {formatPrice(contenido.precio - (contenido.precio * discountPrice))}
                                                    </h5>
                                                </li>
                                                <li className="list-group-item ">
                                                    <div className="card-body">
                                                        <h5>Stock: </h5>
                                                        <h4>{contenido.stock}</h4>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <button
                                                        style={{ outline: "none" }}
                                                        className='btn-add btn-danger'
                                                        onClick={() => addNewProduct(contenido)}
                                                    >
                                                        <i className="fas fa-shopping-cart" />
                                                        Comprar
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col p-3">
                                            {contenido.descripcion}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                contenido.ficha_tecnica || contenido.video ?
                                    <div className="row pt-5">
                                        <div className="col-12">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                {contenido.ficha_tecnica ?
                                                    <li className="nav-item">
                                                        <a className="nav-link active" id="Descripcion-tab" data-toggle="tab" href="#Descripcion" role="tab" aria-controls="home" aria-selected="true">Descripción</a>
                                                    </li>
                                                    :
                                                    null
                                                }
                                                {contenido.video && contenido.ficha_tecnica ?
                                                    <li className="nav-item">
                                                        <a className="nav-link" id="HowToPlay-tab" data-toggle="tab" href="#HowToPlay" role="tab" aria-controls="howtoplay" aria-selected="false">¿Como jugar?</a>
                                                    </li>
                                                    :
                                                    <li className="nav-item">
                                                        <a className="nav-link active" id="HowToPlay-tab" data-toggle="tab" href="#HowToPlay" role="tab" aria-controls="howtoplay" aria-selected="true">¿Como jugar?</a>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                        <div className="col-12 tabBoddy">
                                            <div className="tab-content" id="myTabContent">
                                                {
                                                    contenido.ficha_tecnica ?
                                                        <div className={`tab-pane fade show pt-5 active`} id="Descripcion" role="tabpanel" aria-labelledby="Descripcion-tab">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col"></th>
                                                                        <th scope="col">Detalle</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">Editorial</th>
                                                                        <td>{contenido.ficha_tecnica.editorial}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Jugadores</th>
                                                                        <td>{contenido.ficha_tecnica.jugadores}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Edad Mínima Sugerida</th>
                                                                        <td>{contenido.ficha_tecnica.edad}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Dependencia Del Idioma</th>
                                                                        <td>{contenido.ficha_tecnica.idioma_dependiente}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Idioma</th>
                                                                        <td>{contenido.ficha_tecnica.idioma}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Autor/Autores</th>
                                                                        <td>{contenido.ficha_tecnica.autores}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Componentes</th>
                                                                        <td>{contenido.ficha_tecnica.componentes}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Duración En Minutos</th>
                                                                        <td>{contenido.ficha_tecnica.duracion}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Dimensiones</th>
                                                                        <td>{contenido.ficha_tecnica.dimensiones}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Peso</th>
                                                                        <td>{contenido.ficha_tecnica.peso}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        :
                                                        null
                                                }
                                                {
                                                    contenido.video && contenido.ficha_tecnica ?
                                                        <div className={`tab-pane fade pt-5`} id="HowToPlay" role="tabpanel" aria-labelledby="HowToPlay-tab">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="embed-responsive embed-responsive-16by9">
                                                                        <ReactPlayer
                                                                            width='420'
                                                                            height='300'
                                                                            url={contenido.video}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className={`tab-pane fade show pt-5 active`} id="HowToPlay" role="tabpanel" aria-labelledby="HowToPlay-tab">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="embed-responsive embed-responsive-16by9">
                                                                        <ReactPlayer
                                                                            width='420'
                                                                            height='300'
                                                                            url={contenido.video}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    ) : null
                })
                }
            </div >
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


export default ArtciculosDialogs;
