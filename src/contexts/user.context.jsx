// Import Hooks
import { createContext, useReducer } from "react";


export const UserContext = createContext({ 
        currentUser: null,
        setCurrentUser: () => null,
    }
);

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
    currentUser: null,
};

const userReducer = (state, action) => {
  const { type, currentUser } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: currentUser };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({children})=> {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => 
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, currentUser: user });
    
    
    const value = {
        currentUser,
    };

    return (
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>)
}

