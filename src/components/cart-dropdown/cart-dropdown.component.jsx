
import Button from "../Button/button-component";

import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";

import { 
        CartDropdownContainer, 
        EmptyMessage, 
        CartItems } 
        from "./cart.dropdown.styles";

const CardDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length> 0 ? cartItems.map((item)=>(
                    <CartItem key={item.id} cartItem={item} />
                )):
                (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )
            }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
}

export default CardDropdown;