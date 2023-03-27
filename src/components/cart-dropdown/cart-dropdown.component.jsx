
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import Button from "../Button/button-component";
import CartItem from "../cart-item/cart-item.component";

import { 
        CartDropdownContainer, 
        EmptyMessage, 
        CartItems } 
        from "./cart.dropdown.styles";

const CardDropdown = () => {
    const cartItems = useSelector(selectCartItems);
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