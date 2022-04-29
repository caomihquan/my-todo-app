import React, { useState } from 'react';
import Header from '../components/layout/Header'
import Todos from "./Todos"
import AddTodo from "./AddToDo";
import Footer from "../store/containers/Footer";
import {v4} from "uuid";
function TodoApp() {
    const storageJobs=JSON.parse(localStorage.getItem("jobs"))
    const [state, setState] = useState(storageJobs??{todos:[]});

    const deleteTodo = id => {
        
        setState(()=>{
            const newJobs={
                todos: [
                    ...state.todos.filter(todo => {
                        return todo.id !== id;
                    })
                ]
            }
            const jsonJobs=JSON.stringify(newJobs);
            localStorage.setItem('jobs',jsonJobs);
            return  newJobs
        })
    };

    const addTodo = title => {
        const todoData = {id:v4(),title: title, completed: false }
        
              setState(()=>{
                 const newJobs={todos: [...state.todos,todoData]}

                    const jsonJobs=JSON.stringify(newJobs);
                    localStorage.setItem('jobs',jsonJobs);
                return newJobs;
    })
}

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