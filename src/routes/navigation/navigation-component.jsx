import { Outlet } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import {ReactComponent as Logo} from "../../assets/logo.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { signOutStart } from '../../store/user/user.action';

import { 
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink
} from "./navigation.styles";

const Navigation = () => {
    
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());

    return (
        <>
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
                            <NavLink to="/auth">SIGN IN</NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                { isCartOpen && <CardDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
}

export default Navigation;