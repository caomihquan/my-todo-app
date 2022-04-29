import React from "react";

class TodoItem extends React.Component {
    render() {
        const {completed,id,title} = this.props.todo
        return (
            
            <li className="todo-item">
               <input 
               type="checkbox"
                checked={completed} 
                onChange={() => this.props.handleChange(id)}
                /> 
                <span className={completed ? "completed" : null}>
                <p className="list" type="text" id={id}  onChange={(e)=>{
                this.props.setUpdate(e.target.value,id)}}>{title}</p>
                </span>
                
                <button className="btn-style"
                onClick={() => this.props.deleteTodo(id)}
                > X </button>
            </li>
        )
    }
}
export default TodoItem;