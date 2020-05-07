import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from './config/firebase';
//Componentes
import Header from "./components/Layouts/Header/Header";
import NavBar from "../src/components/Layouts/Navbar/Navbar";
import Footer from "./components/Layouts/Footer/Footer";


const root = document.getElementById('root');

export const renderApp = (hasAuthenticated, user, name, uid) => {

    ReactDOM.render(
        (<div className="App">
            <NavBar authenticated={hasAuthenticated} user={user} name={name} uid={uid} />
            <Header />
            <App authenticated={hasAuthenticated} user={user} name={name} uid={uid} />
            <Footer />
        </div>), root);

};

firebase.auth().onAuthStateChanged((userAuth) => {
    if (userAuth) {
        const user = userAuth.email;
        const name = userAuth.displayName;
        const uid = userAuth.uid;
        renderApp(true, user, name, uid);
    }
    else {
        renderApp(false, null, null);
    }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
