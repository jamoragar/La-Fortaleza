import { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

export function useProducts() {
    const [fbData, setFbData] = useState(null);

    useEffect(() => {
        firebase.database().ref('/Productos').orderByChild('fecha_creacion').limitToLast(240).once('value').then(snapshot => {
            console.log(snapshot.val())
            setFbData(snapshot.val());
        });
    }, []);

    return {
        fbData,
        setFbData
    }
}
//nuevo