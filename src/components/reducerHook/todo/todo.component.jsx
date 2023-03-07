
import { useReducer, useState } from "react";

import TodoItem from "./todo-item.component";

export const ACTIONS = {
    ADD_TODO:"add_todo",
    TOGGLE_TODO:"toggle_todo",
    DELETE_TODO: "delete_todo"
}

const TodoReducer = (todos, action)=>{
    switch(action.type){
        case ACTIONS.ADD_TODO:
            return [...todos, newTodo(action.payload.item)];
        break;
        case  ACTIONS.TOGGLE_TODO:
            return todos.map((todo)=> {
                if(todo.id===action.payload.id){
                    return {...todo, complete: !todo.complete}
                }
                return todo;
            });
        break;
        case ACTIONS.DELETE_TODO:
            return todos.filter((todo)=> todo.id !== action.payload.id );
        break;
        default:
            return todos;
    }
}

const newTodo = (item) =>{
    return {id: Date.now(), item: item, complete: false};
}

const Todo = ()=>{

    const [todos, dispatch] = useReducer(TodoReducer, []);
    const [item, setItem] = useState("");

    const itemHandler = (e) => {
        let itemName = e.target.value;
        setItem(itemName);
    }

    const formHandler = (e)=> {
        e.preventDefault();
        dispatch({type: ACTIONS.ADD_TODO, payload: {item: item}});
        setItem("");
    }

    return (
        <>
            <form onSubmit={formHandler}>
                <input type="text" value={item} onChange={itemHandler} />
            </form>
            <ul>
            {
            todos.map((todo)=> (
                    <TodoItem key={todo.id} todo={todo} dispatch={dispatch}/>
                ))
            }
            </ul>
        </>
    );
}

export default Todo;