import { compose, createStore, applyMiddleware } from "@reduxjs/toolkit";
// import logger from "redux-logger";
// const middleWares = [logger];

import { rootReducer } from "./root-reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }

    console.log("Type: ", action.type);
    console.log("Payload: ", action.payload);
    console.log("currentState: ", store.getState());

    next(action);

    console.log('next state', store.getState());
}

const middleWares = [loggerMiddleware];


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers  = compose (applyMiddleware(...middleWares));

export const store =  createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);

