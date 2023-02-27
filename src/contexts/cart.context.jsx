import { useState, createContext, useEffect } from "react";

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

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen ] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };
    
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem)=> {
          return (total + cartItem.quantity)
        }, 0);

        setCartCount(newCartCount);

    }, [cartItems]);

    useEffect(() => {
      const newCartTotal = cartItems.reduce((total, cartItem) => {
            return (total + cartItem.quantity * cartItem.price);
      }, 0);

      setCartTotal(newCartTotal);

    }, [cartItems]);


    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
      setCartItems(clearCartItem(cartItems, cartItemToClear));
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