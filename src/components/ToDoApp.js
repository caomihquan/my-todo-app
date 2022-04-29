import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header'
import Todos from "./Todos"
import AddTodo from "./AddToDo";
import axios from "axios";
import Footer from "../store/containers/Footer";

function TodoApp() {
    const [state, setState] = useState({
        todos: []
        });
    const deleteTodo = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(response => setState({
                todos: [
                    ...state.todos.filter(todo => {
                        return todo.id !== id;
                    })
                ]
            }))
    }
    const addTodo = title => {
        const todoData = { title: title, completed: false }
        axios.post("https://jsonplaceholder.typicode.com/todos", todoData)
            .then(response => {
                console.log(response.data)
                setState({
                    todos: [...state.todos, response.data]
                })
            })
    };

    const handleCheckboxChange = id => {
        setState({
            todos: state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
    };
    const setUpdate = (title, id) => {
        console.log("items:" + state.todos.title);
        const items = [...state.todos];
        items.map(item => {
            if (item.id === id) {

                item.title = title;
            }
            return item;
        })
        setState({
            todos: items
        })
    };
    useEffect(()=>{
        const config ={
            params:{
                _limit:10
            }
        }

        axios.get("https://jsonplaceholder.typicode.com/todos", config)
            .then(response => setState({ todos: response.data }));
    },[])

    return (

        <div className="container">
            <Header />
            <AddTodo addTodo={addTodo} />
            <Todos
                todos={state.todos}
                handleChange={handleCheckboxChange}
                deleteTodo={deleteTodo}
                setUpdate={setUpdate}
            />
            <Footer/>
        </div>
    )

}
export default TodoApp;