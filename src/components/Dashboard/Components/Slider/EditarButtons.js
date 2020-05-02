import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import firebase from '../../../../config/firebase';

const EditarButtons = () => {
    const [buttons, setButtons] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        firebase.database().ref(`/Slider/Buttons/${id}`).on('value', snapshot => {
            setButtons(snapshot.val());
        })
    }, [])

    if (id && buttons) {
        const { img, id } = buttons;
        return (
            <div>
                <h3>Producto ID: {id}</h3>
                <img alt="..." src={img} />
                <Link to='/Dashboard/:uid/Slider' >
                    <Button variant="outline-primary" block>
                        <i className="fas fa-undo fa-fw" />
                            Volver
                    </Button>
                </Link>
            </div>
        );
    } else {
        return (
            <>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </>
        )
    }
}


export default EditarButtons;