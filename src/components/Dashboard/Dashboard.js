import React, { useState, useEffect } from 'react';
import { Router, Route, Switch, useParams } from 'react-router-dom'
import firebase from '../../config/firebase';
import layout from './Dashboard.module.scss';
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
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const DashboardRoute = (props) => {
    return (
        <Router history={history}>
            <div style={{ overflow: "hidden", height: "100vh", width: "100vw", position: "relative" }} >
                <div className={dashboardStyles.container}>
                    <div className={dashboardStyles.section}>
                        <SideNav props={props.userData} />
                        <div className={mainStyles.container}>
                            <div className={mainStyles.wrapper}>
                                <div style={{ position: "relative" }}>
                                    <Switch>
                                        <Route exact path='/Dashboard/' component={() => <Main props={props.userData} />} />
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
        </Router>
    )
}

const Dashboard = (props) => {

    let { uid } = useParams();

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        firebase.database().ref(`/Users/${uid}`).on('value', (snapshot) => {
            setUserData(snapshot.val());
        })

    }, [])

    if (userData) {
        return (
            <div
                style={{
                    backgroundColor: '#ffffff',
                    margin: '5% 0 0 0',
                    overflow: "hidden",
                    height: "100vh",
                    width: "100vw",
                    position: "relative"
                }}
            >
                <div className={layout.container}>
                    <div className={layout.section}>
                        <DashboardRoute userData={userData} />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <h1 style={{ margin: '20% 0 0 0' }}>Cargando...</h1>
        )
    }
}

export default Dashboard;