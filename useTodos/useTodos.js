import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [
    /*{
        id: new Date().getTime(),
        description: 'Recolectar la piedra del alma',
        done: false
    },
    {
        id: new Date().getTime() * 3,
        description: 'Recolectar la piedra del poder',
        done: false
    }*/
];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);//Redibuja todo el contenido usando el dispatch

    useEffect(() => {
        //localStorage.setItem('todos');
    }, [])
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])


    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action);
    }
    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }
    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }
    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    };
}
