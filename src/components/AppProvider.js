'use client'
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext=createContext({});

export default function AppProvider({children}) {
  const [cartProducts, setCartProducts]=useState([])
  const ls= typeof window !== 'undefined'?window.localStorage : null

  useEffect(()=>{
    if(ls && ls.getItem('cart')){
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  },[])
  function cartProductPrice(cartProduct){
    let price=+cartProduct.price;
    if(cartProduct.size){
      price+=cartProduct.size.price
    }
    return price
  }
  
  function saveCartProductsToLocalStorage(cartProducts){
    if(ls){
      ls.setItem('cart', JSON.stringify(cartProducts))
    }
  }
  function clearCartProducts(){
    setCartProducts([]);
    saveCartProductsToLocalStorage([])
    
  }
  function addToCart(product, size=null){
    setCartProducts(prevProduct=>{
      const cartProduct={...product, size}
      const newCartProduct=[...prevProduct, cartProduct]
      saveCartProductsToLocalStorage(newCartProduct)
      return newCartProduct;
    })
  }
  function removeFromCart(indexToRemove){
    setCartProducts(prevProduct=>{
      const newCartProduct=prevProduct.filter((item, index)=>index !== indexToRemove)
      saveCartProductsToLocalStorage(newCartProduct)
      return newCartProduct;
    })
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{cartProducts, setCartProducts, addToCart, removeFromCart,clearCartProducts, cartProductPrice}}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}
