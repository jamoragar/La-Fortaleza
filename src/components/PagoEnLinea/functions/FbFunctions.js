import firebase from '../../../config/firebase';

export const checkProduct = (product_id) => { 
    return firebase.database().ref(`/Productos/${product_id}`).once('value').then(snapshot => {
        return snapshot.val();
    })
}
export const updateProductStock = (product_id, new_stock) => {
    return firebase.database().ref(`/Productos/${product_id}`).update({
        stock: new_stock
    });
} 