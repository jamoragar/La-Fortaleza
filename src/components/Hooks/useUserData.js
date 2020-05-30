import { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

export function useUserData() {
    const [fbUserData, setFbUserData] = useState(null);

    useEffect(() => {
        firebase.database().ref('/Users').on('value', snapshot => {
            setFbUserData(snapshot.child('pedidos').val());
        });
    }, []);

    return {
        fbUserData,
        setFbUserData
    }
}
