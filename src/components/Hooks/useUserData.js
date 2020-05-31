import { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import { useParams } from 'react-router-dom';

export function useUserData() {
    const [fbUserData, setFbUserData] = useState(null);
    let { uid } = useParams();

    useEffect(() => {
        firebase.database().ref(`Users/${uid}`).on('value', snapshot => {
            setFbUserData(snapshot.val());
        });
    }, []);

    return {
        fbUserData,
        setFbUserData
    }
}
