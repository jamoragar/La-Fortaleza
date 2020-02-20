import React from 'react';
import {Switch, BrowserRouter, Route, } from 'react-router-dom';

import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import Calendar from 'react-calendar';
import Ofertas from '../Ofertas/Ofertas';
import Novedades from '../Novedades/Novedades';
import Lanzamientos from '../Lanzamientos/Lanzamientos';
import Eventos from '../Eventos/Eventos';
import JuegosDeMesa from '../Articulos/BG';
import JuegosDeCartas from '../Articulos/TCG';
import ModelosEscala from '../Articulos/Modelos';
import Comics from '../Articulos/Comics';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/Dashboard' component={Dashboard} />
                <Route path='/Novedades' component={Novedades} />
                <Route path='/Lanzamientos' component={Lanzamientos} />
                <Route path='/Ofertas' component={Ofertas} />
                <Route path='/Calendar' component={Calendar} />
                <Route path='/Eventos' component={Eventos} />
                <Route path='/BG' component={JuegosDeMesa} />
                <Route path='/TCG' component={JuegosDeCartas} />
                <Route path='/Modelos' component={ModelosEscala} />
                <Route path='/Comics' component={Comics} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;