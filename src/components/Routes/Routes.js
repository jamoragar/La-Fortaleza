import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Home from "../Layouts/Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Ofertas from "../Ofertas/Ofertas";
import Preventa from "../Preventa/Preventa";
import Eventos from "../Eventos/Eventos";
import BoardingGames from "../Articulos/Categorias/BoardingGames";
import JuegosDeCartas from "../Articulos/Categorias/TraidingCardsGames";
import ModelosEscala from "../Articulos/Categorias/ModelosEscala";
import Comics from "../Articulos/Categorias/Comics";
import Login from "../Login/Login";
import RolGames from "../Articulos/Categorias/RolGames";
import Xwings from "../Articulos/Categorias/Xwings";
import Accesorios from "../Articulos/Categorias/Accesorios";
import VistaProducto from "../Articulos/Vistas/VistaProducto";

export default function Routes(props) {
  const { fbData } = props;
  let productosToArray = [];
  let categoriaProductos = [];
  let subCategoriaProductos = [];
  //Convertimos el objeto entregado por firebase de productos en un array
  Object.keys(fbData).map((key, i) => {
    productosToArray[i] = fbData[key]
  });
  // Del array generado, extraemos todas las categorias de los productos
  productosToArray.forEach((producto, i) => {
    categoriaProductos[i] = producto.categoria;
  });
  // filtramos las categorias, para que no existan elementos repetidos dentro del array
  categoriaProductos = categoriaProductos.reduce((unique, item) =>
    unique.includes(item) ? unique : [...unique, item], []
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Home fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Preventa" component={() => <Preventa fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
        <Route path="/Ofertas" component={Ofertas} />
        <Route path="/Eventos" component={Eventos} />
        <Route path="/ProductoView" component={() => <VistaProducto fbData={fbData} />} />
        <Route path="/BoardingGames" component={() => <BoardingGames fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
        <Route path="/RolGames" component={() => <RolGames fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
        <Route path="/traidingCardsGames" component={() => <JuegosDeCartas fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
        <Route path="/ModelosEscala" component={() => <ModelosEscala fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
        <Route path="/Comics" component={() => <Comics fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
        <Route path="/X-Wings" component={() => <Xwings fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
        <Route path="/Accesorios" component={() => <Accesorios fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
        <Route path="/Login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

