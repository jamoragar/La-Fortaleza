import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
//Apis
import { Spinner } from 'react-bootstrap';
//Componentes
import Home from "../Layouts/Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Buscador from '../Buscador/Buscador';
import Ofertas from "../Ofertas/Ofertas";
import Eventos from "../Eventos/Eventos";
import ArticulosXCategoria from '../ArticulosXCategoria/ArticulosXCategorias';
import Login from "../Login/Login";
import ArticulosDialogs from "../ArticulosDialogs/ArticulosDialogs";
import Contacto from '../Contacto/Contacto';
import AvisoLegal from '../AvisoLegal/AvisoLegal';
import Blog from '../Blog/Blog';
import CheckOut from '../CheckOut/CheckOut';
import _404 from '../404/404';
import { Exito } from "../PagoEnLinea/Exito";
import { Error } from "../PagoEnLinea/Error";
//Hooks
import { useProducts } from '../Hooks/useProducts';
import { useCategory } from '../Hooks/useCategory';
import Terms from "../TerminosYCon/TerminosYCon";

export const history = createBrowserHistory();

const NotFoundRedirect = () => <Redirect to='/not-found' />

export default function Routes(props) {
  const Productos = useProducts();
  const Category = useCategory();
  const { fbData } = Productos;
  const { category } = Category
  let productosToArray = [];
  let categoriaProductos = [];

  if (fbData) {
    console.log(fbData)

    //Convertimos el objeto entregado por firebase de productos en un array
    Object.keys(fbData).forEach((key, i) => {
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
    console.log(productosToArray)
    return (
      <div className="container-fluid  px-5">
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={() => <Home isAuthed={props.authenticated} uid={props.uid} user={props.user} name={props.name} fbData={productosToArray} category={category} categoriaProductos={categoriaProductos} />} />
            <Route path="/Dashboard/:uid" component={Dashboard} />
            <Route path="/Articulo/:id/" component={() => <ArticulosDialogs fbData={productosToArray} isAuthed={props.authenticated} uid={props.uid} />} />
            <Route path="/Categoria/:description/" component={() => <ArticulosXCategoria fbData={productosToArray} categoriasProductos={categoriaProductos} isAuthed={props.authenticated} uid={props.uid} />} />
            <Route path="/Busqueda/:Search" component={() => <Buscador fbData={productosToArray} />} />
            <Route path="/Ofertas" component={() => <Ofertas fbData={productosToArray} categoriasProductos={categoriaProductos} />} />
            <Route path="/Eventos" component={Eventos} />
            <Route path="/Login" component={Login} />
            <Route path="/Contacto" component={Contacto} />
            <Route path="/AvisoLegal" component={AvisoLegal} />
            <Route path="/TerminosYCondicicones" component={Terms} />
            <Route path="/Blog" component={Blog} />
            <Route path='/CheckOut' component={CheckOut} />
            <Route path="/not-found" component={_404} />
            <Route path="/Pago/Exito" component={Exito} />
            <Route path="/Pago/Error" component={Error} />
            <Route component={NotFoundRedirect} />
          </Switch>
        </Router>
      </div>
    )
  } else {
    return (
      <div className="container-fluid  px-5">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </div>
    )
  }
};



