import React from 'react';
import './ArticulosDialogs.scss';

export default function ArtciculosDialogs() {

    return (
        <div className="container p-3">
            <div className="row">
                <div className="col-xs-12 col-sm-6 inline-block p-3 bg-success" >
                    <h1>Galeria Del Producto</h1>
                    <img className="card-img px-1 py-3" alt="ProdcutoImg" src="img/grid1.jpg"></img></div>
                <div className="col ">
                    <div className="row">
                        <div className="col bg-warning" >
                            <div className='container-fluid p-3'>
                                <h3>{}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col bg-danger">
                            <div className="col pt-3">
                                <h5>ID: 11q2w3ee44r5t6y</h5>
                                <h5>Categoria: Juego De Mesa</h5>
                                <h5>Subcategoria</h5>
                            </div>
                        </div>
                        <div className="col p-0">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-info">
                                    <h5>Precio: </h5>
                                    <h1>$20.990</h1>
                                </li>
                                <li className="list-group-item bg-info">
                                    <div className="card-body">
                                        <h5>Stock: </h5>
                                        <h1> 12</h1>
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
    )
}

