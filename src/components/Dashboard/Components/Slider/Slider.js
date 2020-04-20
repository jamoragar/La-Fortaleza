import React, {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import firebase from '../../../../config/firebase';

const Slider = () => {
    const [slider, setSlider] = useState(null);
    const [buttons, setButtons] = useState(null);
    useEffect(() => {
        firebase.database().ref('/Slider').on('value', snapshot => {
            setSlider(snapshot.child('Main').val());
            setButtons(snapshot.child('Buttons').val());
        })
    }, [])
    if(slider && buttons){
        console.log('Buttons: ', buttons);
        console.log('Slider: ', slider)
        return (
            <h3>En Desarrollo!</h3>
        );
    }
    else{
        return(
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

export default Slider;