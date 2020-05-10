import { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

export function useProducts() {
    const [fbData, setFbData] = useState(null);

    useEffect(() => {
        firebase.database().ref('/Productos').on('value', snapshot => {
            setFbData(snapshot.val());
        });
    }, []);

    return {
        fbData,
        setFbData
    }
}
//nuevo