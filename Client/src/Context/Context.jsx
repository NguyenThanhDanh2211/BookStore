import { useState } from "react";
import React,{createContext} from "react";
import all_books from "../Components/Assets/all_books"

export const Context = createContext(null)

const getDefaultCart =()=>{
    let cart ={};
    for (let index =0; index < all_books.length+1; index++)
    {cart[index] = 0;}
    return cart;
}

const ContextProvider = (props)=>{
    
    const [cartItems, setCartItems]= useState(getDefaultCart());
    const addToCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
    }
    const removeFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_books.find((book)=>book.id===Number(item))
                totalAmount += itemInfo.price * cartItems[item];
            }
        } return totalAmount;
    }
    const getTotalCartItems =()=>{
        let totalItems=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItems += cartItems[item];
            }
        } return totalItems;
    }
    const contextValue = {getTotalCartItems,getTotalCartAmount, all_books,cartItems, addToCart, removeFromCart}
   
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;