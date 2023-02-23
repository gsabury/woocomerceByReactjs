// Import Hooks
import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../routes/utils/firebase/firebase.utils";

// create and set default value for the UserContext
export const UserContext = createContext({ 
        currentUser: null,
        setCurrentUser: () => null,
    }
);

export const UserProvider = ({children})=> {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(()=>{
        const unsubcribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
        });
        return unsubcribe;
    },[]);

    return (
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>)
}

