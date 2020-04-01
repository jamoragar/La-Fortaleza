import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SideNav from './SideNav/SideNav';
import Main from './Main/Main';
import Agenda from './Components/Agenda/Agenda';
import Slider from './Components/Slider/Slider';
import Blog from './Components/Blog/Blog';
import Productos from './Components/Productos/Productos';
import Categorias from './Components/Categorias/Categorias';
import Ordenes from './Components/Ordenes/Ordenes';
import VerProducto from './Components/Productos/VerProducto';

import dashboardStyles from './Dashboard.module.scss'
import mainStyles from './Main.module.scss';

const Dashboard = () => {
    return (
        <div style={{ overflow: "hidden", height: "100vh", width: "100vw", position: "relative", marginTop: "5%" }} >
            <div className={dashboardStyles.container}>
                <div className={dashboardStyles.section}>
                    <SideNav />
                    <div className={mainStyles.container}>
                        <div className={mainStyles.wrapper}>
                            <div style={{ position: "relative" }}>
                                <Switch>
                                    <Route exact path='/Dashboard/' component={Main} />
                                    <Route exact path='/Dashboard/Agenda' component={Agenda} />
                                    <Route exact path='/Dashboard/Slider' component={Slider} />    
                                    <Route exact path='/Dashboard/Blog' component={Blog} />    
                                    <Route exact path='/Dashboard/Productos' component={Productos} />
                                    <Route exact path='/Dashboard/Categorias' component={Categorias} />
                                    <Route exact path='/Dashboard/Ordenes' component={Ordenes} /> 
                                    <Route exact path="/Dashboard/Producto/:id" component={VerProducto} />
                                </Switch>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;