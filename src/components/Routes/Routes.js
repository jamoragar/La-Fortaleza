import React from 'react';
import {Switch, BrowserRouter, Route, } from 'react-router-dom';

import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/Dashboard' component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;