import { useReducer, useEffect } from 'react';

const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ORDER':
            return {
                order: [...state.order, action.payload]
            };
        case 'REMOVE_ORDER':
            const newOrder = [...state.order];
            newOrder.splice(action.payload, 1);
            console.log(newOrder);
            return{
                order: newOrder
            }
        default:
            break;
    }
};
export function useOrders() {
    const initialState = {
        order: []
    }
    const [state, dispatch] = useReducer(appReducer, [], () => {
        const persisted = JSON.parse(localStorage.getItem('order'))
        return persisted ? persisted : initialState
    })

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(state))
    }, [state]);

    return {
        state,
        dispatch
    }
}