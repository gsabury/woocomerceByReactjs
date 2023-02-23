import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import './navigation.styles.scss';

import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../utils/firebase/firebase.utils";

import { CartContext } from "../../contexts/cart.context";

import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import CartIcon from "../../components/cart-icon/cart-icon.component";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <Logo></Logo>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                        ) : (
                            <Link className="nav-link" to="/auth">
                            SIGN IN
                        </Link>
                        )}
                    <CartIcon />
                </div>
                { isCartOpen && <CardDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;