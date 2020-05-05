import React from 'react';

const Main = (props) => {
    Object.keys(props);
    const userData = props.props;
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="text-center" style={{ marginTop: '3rem', marginBottom: '3rem', fontWeight: 'bolder', color: '#606060' }}>Bienvenido {userData.nombre} </h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 className="text-center" style={{ marginTop: '3rem', marginBottom: '3rem', fontWeight: 'bolder', color: '#606060' }}>Pronto Tendremos novedades para ti...</h2>
                </div>
            </div>
        </div>
    )
}

export default Main;