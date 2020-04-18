import React, { useState, useEffect } from 'react';
import { formatPrice } from '../Data/DataProductos';
import firebase from '../../config/firebase';
import './ArticulosDialogs.scss';

export default function ArtciculosDialogs(producto) {
    const [productView, setProductView] = useState();
    let productViewToArray = [];
    let selectToArray = [];

    useEffect(() => {
        firebase.database().ref('/Productos').on('value', snapshot => {
            setProductView(snapshot.val());
        });
    }, []);

    Object.keys(producto).forEach((key, i) => {
        selectToArray[i] = producto[key]
    });

    const selectId = selectToArray[2].params.id;

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
                {Object.entries(productosView).map(([abreviacion, contenido], i) => {
                    return selectId === contenido.id ? (
                        <div key={i} className="container p-3 mt-5 mb-5"
                            style={{
                                borderColor: "#818182",
                                boxShadow: "0 15px 25px 5px #818182",
                                minWidth: "285px",
                                color: "#606060"
                            }}>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 inline-block p-3 " >
                                    <img className="card-img px-1 py-3" alt="ProdcutoImg" src={contenido.img}></img></div>
                                <div className="col ">
                                    <div className="row">
                                        <div className="col " >
                                            <div className='container-fluid p-3' style={{ fontWeight: "bold", fontSize: "20px" }}>
                                                {contenido.nombre}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col ">
                                            <div className="col pt-3">
                                                <h5>Categoria: </h5>{contenido.categoria}
                                                <h5>Subcategoria: </h5>{contenido.subcategoria}
                                            </div>
                                        </div>
                                        <div className="col p-0">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item ">
                                                    <h3>Precio:</h3>
                                                </li>
                                                <li className="list-group-item ">
                                                    <h6 className="text-muted">
                                                        Antes <s>{formatPrice(contenido.precio)}</s>
                                                    </h6>
                                                </li>
                                                <li className="list-group-item ">
                                                    <h6 className="text-success">
                                                        Ahora {formatPrice(contenido.precio - (contenido.precio * discountPrice))}
                                                    </h6>
                                                </li>
                                                <li className="list-group-item ">
                                                    <div className="card-body">
                                                        <h5>Stock: </h5>
                                                        <h4>{contenido.stock}</h4>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col p-3">
                                            En Takenoko los jugadores tendrán que irrigar,
                                            cultivar y gestionar parcelas de terreno para
                                            hacer crecer la mayor cantidad de bambú posible
                                            para alimentar a un oso panda sagrado.
                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-5">
                                <div className="col-12">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="Descripcion-tab" data-toggle="tab" href="#Descripcion" role="tab" aria-controls="home" aria-selected="true">Descripción</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="Detalles-tab" data-toggle="tab" href="#Detalles" role="tab" aria-controls="detalles" aria-selected="false">Detalles Del Producto</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="HowToPlay-tab" data-toggle="tab" href="#HowToPlay" role="tab" aria-controls="howtoplay" aria-selected="false">How To Play</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-12 tabBoddy">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show pt-5 active" id="Descripcion" role="tabpanel" aria-labelledby="Descripcion-tab">
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
                                                        <td>Matagot</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Jugadores</th>
                                                        <td>2 - 4</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Edad Mínima Sugerida</th>
                                                        <td>8 +</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Dependencia Del Idioma</th>
                                                        <td>Nula</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Idioma</th>
                                                        <td>Español</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Autor/Autores</th>
                                                        <td>Antoine Bauza</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Componentes</th>
                                                        <td>28 Losetas de parcela; 90 Secciones de bambú (verde, amarillo, rosado); 20 Fichas de canales de riego; 9 Fichas de mejoras; 46 Cartas objetivo; 4 Tableros; 8 Fichas de acción; 1 Dado de clima; 1 Panda; 1 Jardinero; Instrucciones.</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Duración En Minutos</th>
                                                        <td>45 min</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Dimensiones</th>
                                                        <td>23 x 8 x 33 cm</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Peso</th>
                                                        <td>1.2 kg</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="tab-pane fade pt-5" id="HowToPlay" role="tabpanel" aria-labelledby="HowToPlay-tab">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="embed-responsive embed-responsive-16by9">
                                                        <iframe title="Takenoko" width="560" height="315" src="https://www.youtube.com/embed/P8O72qTsH3E" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="Detalles" role="tabpanel" aria-labelledby="detalles-tab">aca van los detalles</div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    ) : null
                })
                }
            </div>
        )
    } else {
        return (
            <div>
                Cargando...
            </div>
        )
    }

}

