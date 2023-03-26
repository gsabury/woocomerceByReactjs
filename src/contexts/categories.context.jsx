import { createContext, useEffect, useReducer} from "react";

import {getCategoriesAndDocuments } from "../routes/utils/firebase/firebase.utils";


export const CategoriesContext = createContext();

const CAT_ACTION_TYPES = {
    SET_CAT:"set_Cat",
}

const CAT_INIT_VALUE = {
    categoriesMap: {},
}

const categoryReducer = (state, action) => {
    const {type, items} = action;
    switch(type){
        case CAT_ACTION_TYPES.SET_CAT:
            return {...state, categoriesMap: items};
        default:
            return state;
    }
}

export const CategoriesProvider = ({children}) =>{
    const [{categoriesMap}, dispatch] = useReducer(categoryReducer, CAT_INIT_VALUE);

    const setCategoriesWithItems = (items)=> {
        dispatch({type:CAT_ACTION_TYPES.SET_CAT, items: items});
    }

    const value = {categoriesMap} 

    useEffect( () => {
        const getCategoriesMap = async()=>{
            const categoriesMap = await getCategoriesAndDocuments("categories");
            setCategoriesWithItems(categoriesMap);
        }
        getCategoriesMap();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>)
}

