import React, { useState } from "react";
import { useReducer } from "react";

const iState = {
    items: [],
    totalAmount: 0
};

const Actions = {
    ADD_ITEM: 'add_item',
    REMOVE_ITEM: 'remove_item'
};

function cartReducer(state, action) {
    switch (action.type) {
        case Actions.ADD_ITEM:
            const updatedItems = [...state.items, action.payload];
            const newTotalAmount = state.totalAmount + action.payload.price;
            return {
                ...state,
                items: updatedItems,
                totalAmount: newTotalAmount
            }
        case Actions.REMOVE_ITEM:
            const indexToRemove = state.items.findIndex((i) => i.id === action.payload.id);
            if (indexToRemove !== -1) {
                const updatedItemsRemove = [...state.items];
                updatedItemsRemove.splice(indexToRemove, 1);
                const newTotalAmountRemove = state.totalAmount - action.payload.price;
                return {
                    ...state,
                    items: updatedItemsRemove,
                    totalAmount: newTotalAmountRemove
                };
            }
            return state;
        default:
            return state;
    }
}

function Cart() {
    const [state, dispatch] = useReducer(cartReducer, iState);
    const addItem = (newItem) => {
        dispatch({ type: Actions.ADD_ITEM, payload: newItem });
    };
    const removeItem = (item) => {
        dispatch({ type: Actions.REMOVE_ITEM, payload: item });
    };
    return (
        <div>
            <h1>Cart Application</h1>
            <ul>
                {console.log(state)}
                {state.items.map((item, index) => (
                    <li key={index}>
                        {item.name} - Rs.{item.price}
                        <button onClick={() => removeItem(item)}>Remove</button>
                    </li>
                ))}
            </ul>
            Cart Value = {state.totalAmount}
            <button onClick={() => addItem({ id: 1, name: 'Apple', price: 150 })}>Apple</button>
            <button onClick={() => addItem({ id: 2, name: 'Orange', price: 100 })}>Orange</button>
            <button onClick={() => addItem({ id: 3, name: 'Mango', price: 50 })}>Mango</button>
        </div>
    );
}

export default Cart;
