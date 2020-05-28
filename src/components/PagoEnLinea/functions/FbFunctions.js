import firebase from '../../../config/firebase';

export const checkProduct = (product_id) => { 
    return firebase.database().ref(`/Productos/${product_id}`).once('value').then(snapshot => {
        return snapshot.val();
    })
}