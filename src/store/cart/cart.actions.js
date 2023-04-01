import CART_ACTION_TYPES from "./cart.types";

import { createAction } from "../../utils/reducer/reducer.utils";

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


export const setIsCartOpen = (state) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, state);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};