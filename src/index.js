import React from "react";
import TodoApp from "./components/ToDoApp";
import { createRoot } from 'react-dom/client';
import "./App.css";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
const store = createStore(rootReducer);

const root=createRoot(document.getElementById("root"));
root.render(<Provider store={store}>
    <TodoApp />
    </Provider>);