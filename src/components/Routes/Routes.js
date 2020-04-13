import React, { Component } from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';

import Home from "../Layouts/Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Ofertas from "../Ofertas/Ofertas";
import Preventa from "../Articulos/Categorias/Preventa";
import Eventos from "../Eventos/Eventos";
import BoardingGames from "../Articulos/Categorias/BoardingGames";
import JuegosDeCartas from "../Articulos/Categorias/TraidingCardsGames";
import Armables from "../Articulos/Categorias/Armables";
import Comics from "../Articulos/Categorias/Comics";
import Login from "../Login/Login";
import RolGames from "../Articulos/Categorias/RolGames";
import XWing from "../Articulos/Categorias/Xwing";
import Accesorios from "../Articulos/Categorias/Accesorios";
import ArticulosDialogs from "../ArticulosDialogs/ArticulosDialogs";
import Contacto from '../Contacto/Contacto';
import AvisoLegal from '../AvisoLegal/AvisoLegal';
import Terms from '../terms/Terms';
import _404 from '../404/404';


export const history = createBrowserHistory();

const NotFoundRedirect = () => <Redirect to='/not-found' />

export default function Routes({ fbData, articulo, setArticulo, addCart, setAddCart }) {
  let productosToArray = [];
  let categoriaProductos = [];

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
    <div className="container-fluid  px-5">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={() => <Home addCart={addCart} setAddCart={setAddCart} setArticulo={setArticulo} articulo={articulo} fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Articulo" component={() => <ArticulosDialogs articulo={articulo} setArticulo={setArticulo} />} />
          <Route path="/Preventa" component={() => <Preventa fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
          <Route path="/Ofertas" component={Ofertas} />
          <Route path="/Eventos" component={Eventos} />
          <Route path="/JuegosDeMesa" component={() => <BoardingGames fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
          <Route path="/JuegosDeRol" component={() => <RolGames fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
          <Route path="/JuegosDeCartas" component={() => <JuegosDeCartas fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
          <Route path="/Armables" component={() => <Armables fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
          <Route path="/Comics" component={() => <Comics fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
          <Route path="/X-Wing" component={() => <XWing fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
          <Route path="/Accesorios" component={() => <Accesorios fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
          <Route path="/Login" component={Login} />
          <Route path="/Contacto" component={Contacto} />
          <Route path="/AvisoLegal" component={AvisoLegal} />
          <Route path="/TerminosYCondiicones" component={Terms} />
          <Route path="/not-found" component={_404} />
          <Route component={NotFoundRedirect} />
        </Switch>
      </Router>
    </div>
  );
};

