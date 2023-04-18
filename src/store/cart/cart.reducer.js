import CART_ACTION_TYPES from "./cart.types";

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
  };
  
  
  const cartReducer = (state = INITIAL_STATE, action= {}) => {
    const { type, payload } = action;
  
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
            ...state,
            cartItems: payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
              ...state,
              isCartOpen: payload,
            };
        case CART_ACTION_TYPES.MAKE_CART_EMPTY:
          return INITIAL_STATE;
      default:
        return state;
    }
  };

  export default cartReducer;