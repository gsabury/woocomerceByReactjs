import { compose, createStore, applyMiddleware } from "@reduxjs/toolkit";
// import logger from "redux-logger";
// const middleWares = [logger];

import { rootReducer } from "./root-reducer";


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

const composedEnhancers  = compose (applyMiddleware(...middleWares));

export const store =  createStore(rootReducer, undefined, composedEnhancers);

