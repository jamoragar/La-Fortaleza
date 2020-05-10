import { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

export function useCategory() {
    const [category, setCategory] = useState(null);

    useEffect(() => {
        firebase.database().ref('/Category').on('value', snapshot => {
            setCategory(snapshot.val());
        })
    }, []);
    return {
        category,
        setCategory
    }
}
//nuevo