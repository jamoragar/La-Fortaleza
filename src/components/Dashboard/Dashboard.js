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
import DetalleOrden from './Components/Ordenes/DetalleOrden';
import Pedidos from './userComponents/Pedidos';
import DetallePedidos from './userComponents/DetallePedidos'
import VerProducto from './Components/Productos/VerProducto';
import EditarProductos from './Components/Productos/EditarProducto';
import Profile from './userComponents/Profile';
import EditarSlider from './Components/Slider/EditarSlider';
import EditarButtons from './Components/Slider/EditarButtons';

import dashboardStyles from './Dashboard.module.scss'
import mainStyles from './Main.module.scss';
import { createBrowserHistory } from 'history';



export const history = createBrowserHistory();

const DashboardRoute = (props) => {
    return (
        <div style={{ overflow: "hidden", height: "100vh", width: "100vw", position: "relative", margin: "none" }} >
            <Router history={history}>
                <div className={dashboardStyles.container}>
                    <div className={dashboardStyles.section}>
                        <SideNav props={props.userData} />
                        <div className={mainStyles.container}>
                            <div className={mainStyles.wrapper}>
                                <div style={{ position: "relative" }}>
                                    <Switch>
                                        <Route exact path='/Dashboard/:uid/' component={() => <Main props={props.userData} />} />
                                        <Route exact path='/Dashboard/:uid/Agenda' component={Agenda} />
                                        <Route exact path='/Dashboard/:uid/Slider' component={Slider} />
                                        <Route exact path='/Dashboard/:uid/Blog' component={Blog} />
                                        <Route exact path='/Dashboard/:uid/Productos' component={Productos} />
                                        <Route exact path='/Dashboard/:uid/Categorias' component={Categorias} />
                                        <Route exact path='/Dashboard/:uid/Ordenes' component={Ordenes} />
                                        <Route exact path='/Dashboard/:uid/DetalleOrden/:id_interno' component={DetalleOrden} />
                                        <Route exact path='/Dashboard/:uid/pedidos' component={Pedidos} />
                                        <Route exact path='/Dashboard/:uid/DetallePedidos/:id_interno' component={DetallePedidos} />
                                        <Route exact path="/Dashboard/:uid/Producto/:id" component={VerProducto} />
                                        <Route exact path="/Dashboard/:uid/Producto/Editar/:id" component={EditarProductos} />
                                        <Route exact path="/Dashboard/:uid/Slider/EditarSlider/:id" component={EditarSlider} />
                                        <Route exact path="/Dashboard/:uid/Slider/EditarButtons/:id" component={EditarButtons} />
                                        <Route exact path='/Dashboard/:uid/Profile' component={() => <Profile props={props.userData} />} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export const Dashboard = (props) => {

    let { uid } = useParams();
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        firebase.database().ref(`/Users/${uid}`).on('value', (snapshot) => {
            setUserData(snapshot.val());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (userData) {
        return (
            <div
                style={{
                    backgroundColor: '#ffffff',
                    margin: '0 0 0 0',
                    overflow: "hidden",
                    height: "100vh",
                    position: "relative"
                }}
            >
                <div className={layout.container}>
                    <div className={layout.section}>
                        <DashboardRoute userData={userData} props={props.userData} />
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