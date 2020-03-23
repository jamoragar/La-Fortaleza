import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Ofertas from "../Ofertas/Ofertas";
import Preventa from "../Preventa/Preventa";
import Eventos from "../Eventos/Eventos";
import BoardingGames from "../Articulos/BoardingGames";
import JuegosDeCartas from "../Articulos/TraidingCardsGames";
import ModelosEscala from "../Articulos/ModelosEscala";
import Comics from "../Articulos/Comics";
import Login from "../Login/Login";
import RolGames from "../Articulos/RolGames";
import Xwings from "../Articulos/Xwings";
import Accesorios from "../Articulos/Accesorios";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Preventa" component={Preventa} />
        <Route path="/Ofertas" component={Ofertas} />
        <Route path="/Eventos" component={Eventos} />
        <Route path="/BoardingGames" component={BoardingGames} />
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

export default Routes;
