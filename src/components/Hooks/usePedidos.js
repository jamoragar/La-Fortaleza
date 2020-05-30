import { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

export function usePedidos() {
    const [fbPedidos, setFbPedidos] = useState(null);

    useEffect(() => {
        firebase.database().ref('/Pedidos').on('value', snapshot => {
            setFbPedidos(snapshot.val());
        });
    }, []);

    return {
        fbPedidos,
        setFbPedidos
    }
}