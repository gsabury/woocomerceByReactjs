import {createContext, useState, useReducer } from "react";

import { createAction } from "../routes/utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {

  // Check whether the product exists in the cartItems or not, if not exists it will return undefined / false
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id );
    
  // If the productToAdd exists in cartItem, update the quantity and return new array object
  if (existingCartItem) {
        return cartItems.map((cartItem) => { 
            return cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }: cartItem
        });
  }
    
  // Copy the cartItems and productToAdd to a new array object
  return [...cartItems, { ...productToAdd, quantity: 1 }];

};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => {
        return (cartItem.id !== cartItemToRemove.id);
    });
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>{
    return (cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
  });
  
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => {
    return (cartItem.id !== cartItemToClear.id);
  });
};

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};


const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartContext = createContext();


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (cartItems) => {

      const newCartCount = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );
  
      const newCartTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      );
  
      const payload = {
        cartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      };
  
      dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };
    
    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
      const newCartItems = clearCartItem(cartItems, cartItemToClear);
      updateCartItemsReducer(newCartItems);
    };

    const value = {
      isCartOpen, 
      setIsCartOpen, 
      addItemToCart, 
      removeItemToCart,
      clearItemFromCart,
      cartItems, 
      cartCount,
      cartTotal
    };

    return(<CartContext.Provider value={value}>{children}</CartContext.Provider>);

}