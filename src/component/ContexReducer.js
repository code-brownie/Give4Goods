import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, img: action.img, Qty: action.Qty }]
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((item, index) => {
                if (item.id === action.id) {
                    arr[index] = { ...item, Qty: parseInt(action.Qty) + item.Qty, price: action.price + item.price }
                }
            })
            return arr
        default:
            console.log("Error in reducer");
    }
};

const CartProvider = ({ children }) => {
    const initialState = () => {
        try {
            const cartData = localStorage.getItem('UserCart');
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error retrieving cart data:', error);
            return [];
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState());

    useEffect(() => {
        try {
            localStorage.setItem('UserCart', JSON.stringify(state));
        } catch (error) {
            console.error('Error saving cart data:', error);
        }
    }, [state]);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

const useCart = () => useContext(CartStateContext);
const useDispatchCart = () => useContext(CartDispatchContext);

export { CartProvider, useCart, useDispatchCart };
