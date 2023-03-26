import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import { useSelector } from 'react-redux';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { CartContext } from "../../contexts/cart.context";

import { selectCurrentUser } from '../../store/user/user.selector';

import {ReactComponent as Logo} from "../../assets/logo.svg";

import { signOutUser } from "../utils/firebase/firebase.utils";


import { 
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink
} from "./navigation.styles";

const Navigation = () => {
    
    const currentUser = useSelector(selectCurrentUser);

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