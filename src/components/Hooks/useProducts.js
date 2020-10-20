import { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import moment from 'moment';
import fs from 'browserify-fs';


export function useProducts() {
    const [fbData, setFbData] = useState(null);
    const [fbCategoria, setFbCategoria] = useState(null);
    const fbDbCategory = firebase.database().ref('/Category');
    let productos = [];

    useEffect(() => {
        // fbDbCategory.orderByChild('description').on('value', (snapshot) => {
        //     // console.log('nombre del nodo: ' + snapshot.key + ' description: ' + snapshot.val().description);
        //     snapshot.forEach(child => {
        //         // console.log(child.val().description)
        //         firebase.database().ref('/Productos').orderByChild('categoria').equalTo(child.val().description).limitToLast(18).once('value').then(snapshot => {
        //             productos.push(snapshot.val())
        //             console.log(productos)
        //             setFbData(productos)
        //         });
        //     });
        // });
        
        const unsubscribe = firebase.database().ref('/Productos')
            .orderByChild('fecha_creacion')
            .limitToLast(240)
            .once('value')
            .then(snapshot => {
                setFbData(snapshot.val());
            });

        return (() => unsubscribe())
    }, []);
    
//     if(fbData){
//     //     console.log(fbData.length)
//     //     return {
//         //         fbData,
//         //         setFbData
//         //     }
//         // }else{
//             //     return(
//                 //         [],
//                 //         setFbData
//                 //     )
//     let time;
//     Object.keys(fbData).map(key => {
//         time = moment(fbData[key].fecha_creacion, 'DD-MM-YYYY h:mm:ss a').format('X');
//         fbData[key].fecha_creacion = time === 'Invalid date' ? fbData[key].fecha_creacion : parseInt(time)

//     });

//     console.log(fbData)
    
//     setTimeout(() => {
//         firebase.database().ref('/Productos').set(fbData);
//     }, 6000)

// }
    return {
        fbData,
        setFbData
    }
    

}

//nuevo