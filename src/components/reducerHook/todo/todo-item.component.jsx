

import { ACTIONS } from "./todo.component";

const TodoItem = ({todo, dispatch}) => {

    const deleteItem = (id) => {
        dispatch({type: ACTIONS.DELETE_TODO, payload: {id: id}});
    }

    const completeItem = (id) => {
        dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: id}});
    }

    return (
        <li >
        <span style={{color: todo.complete ? '#AAA': '#000'}}>{todo.item}</span>
        <button onClick={ (e) => deleteItem(todo.id)}>Delete</button>
        - 
        <button onClick={ (e) => completeItem(todo.id)}>Complete</button>
    </li>
    );
}

export default TodoItem;