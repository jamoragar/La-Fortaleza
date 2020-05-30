import firebase from '../../../config/firebase';

export const checkProductStock = (product_id) => { 
    return firebase.database().ref(`/Productos/${product_id}`).child('stock').once('value').then(snapshot => {
        return snapshot.val();
    })
}
export const checkClientOrder = (user_id, order_id) => {
    return firebase.database().ref(`/Users/${user_id}/pedidos/${order_id}`).once('value').then(snapshot => {
        return snapshot.val();
    })
}
export const updateProductStock = (product_id, new_stock) => {
    firebase.database().ref(`/Productos/${product_id}`).update({
        stock: new_stock
    });
} 