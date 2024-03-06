import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const userCart = state[action.userId] || [];
            const updatedCart = [...userCart, { id: action.id, name: action.name, price: action.price, img: action.img, Qty: action.Qty }];
            return { ...state, [action.userId]: updatedCart };
        case "REMOVE":
            const filteredCart = (state[action.userId] || []).filter(item => item.id !== action.id);
            return { ...state, [action.userId]: filteredCart };
        case "UPDATE":
            const updatedUserCart = (state[action.userId] || []).map(item =>
                item.id === action.id
                    ? { ...item, Qty: parseInt(action.Qty) + item.Qty, price: action.price + item.price }
                    : item
            );
            return { ...state, [action.userId]: updatedUserCart };
        default:
            console.log("Error in reducer");
            return state;
    }
};

const CartProvider = ({ children }) => {
    const initialState = () => {
        try {
            const cartData = localStorage.getItem('UserCart');
            return cartData ? JSON.parse(cartData) : {};
        } catch (error) {
            console.error('Error retrieving cart data:', error);
            return {};
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

const useCart = (userId) => {
    const state = useContext(CartStateContext);

    if (!userId || !state[userId]) {
        return [];
    }

    return state[userId];
};

const useDispatchCart = () => useContext(CartDispatchContext);

export { CartProvider, useCart, useDispatchCart };
