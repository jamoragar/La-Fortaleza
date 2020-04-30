import React from 'react';

const Main = (props) => {
    Object.keys(props);
    const userData = props.props;
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="text-center">Bienvenido {userData.nombre} </h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 className="text-center">Pronto Tendremos novedades para ti...</h2>
                </div>
            </div>
        </div>
    )
}

export default Main;