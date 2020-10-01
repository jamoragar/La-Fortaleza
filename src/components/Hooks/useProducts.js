import { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import moment from 'moment';
import fs from 'browserify-fs';


export function useProducts() {
    const [fbData, setFbData] = useState(null);

    useEffect(() => {
        console.log(Date.now())
        const unsubscribe = firebase.database().ref('/Productos').orderByChild('fecha_creacion').limitToFirst(10).on('value', snapshot => {
            console.log(snapshot.val())
            setFbData(snapshot.val());
        });
        return (() => unsubscribe());
    }, []);
    // if(fbData){
    //     let time;
    //     Object.keys(fbData).map(key => {
    //         time = moment(fbData[key].fecha_creacion, 'DD-MM-YYYY h:mm:ss a').format('X');
    //         fbData[key].fecha_creacion = parseInt(time);
    //     });

    //     console.log(fbData)

    //     firebase.database().ref().child(`/Productos`).set(fbData)
    // }

    return {
        fbData,
        setFbData
    }
}
//nuevo