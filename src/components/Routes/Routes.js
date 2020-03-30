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
  //console.log(fbData);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Home fbData={fbData} />} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Preventa" component={Preventa} />
        <Route path="/Ofertas" component={Ofertas} />
        <Route path="/Eventos" component={Eventos} />
        <Route path="/ProductoView" component={() => <VistaProducto fbData={fbData} />} />
        <Route path="/BoardingGames" component={() => <BoardingGames fbData={fbData} />} />
        <Route path="/RolGames" component={RolGames} />
        <Route path="/traidingCardsGames" component={JuegosDeCartas} />
        <Route path="/ModelosEscala" component={ModelosEscala} />
        <Route path="/Comics" component={Comics} />
        <Route path="/X-Wings" component={Xwings} />
        <Route path="/Accesorios" component={Accesorios} />
        <Route path="/Login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

