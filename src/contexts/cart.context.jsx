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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
});


export const CartProvider = ({children}) => {

        const [isCartOpen, setIsCartOpen ] = useState(false);

        const [cartItems, setCartItems] = useState([]);

        const [cartCount, setCartCount] = useState(0);

        const addItemToCart = (productToAdd) => {
            setCartItems(addCartItem(cartItems, productToAdd));
        };
    
        useEffect(() => {
            const newCartCount = cartItems.reduce(
              (total, cartItem) => total + cartItem.quantity,
              0
            );
            setCartCount(newCartCount);
          }, [cartItems]);

        const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

        return(
            <CartContext.Provider value={value}>
                {children}
            </CartContext.Provider>
        );
}