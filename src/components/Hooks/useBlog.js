import { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

export function useBlog() {
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        firebase.database().ref('/Blog').on('value', snapshot => {
            setBlog(snapshot.val());
        })
    }, []);
    return {
        blog,
        setBlog
    }
}
//nuevo