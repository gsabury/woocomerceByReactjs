import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/logo.svg";


import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../utils/firebase/firebase.utils";

import { CartContext } from "../../contexts/cart.context";

import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import CartIcon from "../../components/cart-icon/cart-icon.component";

import { 
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink
} from "./navigation.styles";

const Navigation = () => {
    
    const {currentUser} = useContext(UserContext);

    const {isCartOpen} = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <Logo></Logo>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                        ) : (
                            <NavLink to="/auth">
                            SIGN IN
                        </NavLink>
                        )}
                    <CartIcon />
                </NavLinks>
                { isCartOpen && <CardDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;