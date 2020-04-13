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

export default function Routes(props) {
  console.log('router rendering...')

  return (
    <div className="container-fluid  px-5">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Articulo/:id/" component={ArticulosDialogs} />
          <Route path="/Preventa" component={Preventa}/>
          <Route path="/Ofertas" component={Ofertas} />
          <Route path="/Eventos" component={Eventos} />
          <Route path="/JuegosDeMesa" component={BoardingGames}/>
          <Route path="/JuegosDeRol" component={RolGames}/>
          <Route path="/JuegosDeCartas" component={JuegosDeCartas}/>
          <Route path="/Armables" component={Armables}/>
          <Route path="/Comics" component={Comics}/>
          <Route path="/X-Wing" component={XWing}/>
          <Route path="/Accesorios" component={Accesorios}/>
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

