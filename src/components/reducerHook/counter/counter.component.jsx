
import { useReducer } from "react";

export const ACTION_TYPES = {
    INCREMENT:"increment",
    DECREMENT:"decrement",
    CHANGE_COUNTER:"change_counter",
    RESET_COUNT: "reset",
}

const counterReducer = (state, action)=>{
    switch(action.type){
        case ACTION_TYPES.INCREMENT:
            return {...state, count: state.count+state.counter}
        case ACTION_TYPES.DECREMENT:
            return {...state, count: state.count-state.counter}
        case ACTION_TYPES.RESET_COUNT:
            return {...state, count: 0, counter:1}
        case ACTION_TYPES.CHANGE_COUNTER:
            return { ...state, counter: action.payload.counter };
        default:
            return state;
    }
}

const Counter = () =>{
    
    const [state, dispatch] = useReducer(counterReducer, {count:0, counter:1});

    const increment = () =>{
        dispatch({type: ACTION_TYPES.INCREMENT});
    }

    const decrement = () =>{
        dispatch({type: ACTION_TYPES.DECREMENT});
    }

    const resetCount = () =>{
        dispatch({type: ACTION_TYPES.RESET_COUNT});
    }

    const changeCount = () =>{
        dispatch({type: ACTION_TYPES.CHANGE_COUNTER, payload: {counter: 10}});
    }

    return (
        <>
            <button onClick={decrement}>Decrement</button>
            <span>{state.count}</span>
            <button onClick={increment}>Increment</button>
            <button onClick={resetCount}>Reset</button>
            <button onClick={changeCount}>Change Counter</button>
        </>
    );
}

export default Counter;