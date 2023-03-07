import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../routes/utils/firebase/firebase.utils";

// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap:{},
});

export const CategoriesProvider = ({children}) =>{
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap} 

//     useEffect(() => {
//     addCollectionAndDocuments('categories', SHOP_DATA);
//   }, []);

    useEffect( () => {
        const getCategoriesMap = async()=>{
            const categoriesMap = await getCategoriesAndDocuments("categories");
            setCategoriesMap(categoriesMap);
            console.log(categoriesMap);
        }
        getCategoriesMap();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>)
}

