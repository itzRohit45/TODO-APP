import './TodoList.css'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';

export default function TodoList(){

let [todos,setTodos]=useState([{task:"sample task",id:uuidv4(),isdone:false}]);
let [newTodos,setNewTodos]=useState("");


let addNewTask=()=>{
  setTodos((prevTodo)=>{
    return [...prevTodo,{task:newTodos,id:uuidv4(),isdone:false}]
  });
  setNewTodos("");
}

let updateTodoValue=(event)=>{
    setNewTodos(event.target.value);
}

let deleteTodo=(id)=>{
    let copy=todos.filter((todo)=>todo.id!=id);
    setTodos(copy);
}

let markAsDone=(id)=>{
 setTodos((prevTodo)=>
    prevTodo.map((todo)=>{
        if(todo.id== id){
             return{
                    ...todo,isdone:true,
                };
        } else{
                return todo;
            }
    })   
    );
}
let markAllDone=()=>{
    setTodos((prevTodo)=>
       prevTodo.map((todo)=>{
         return{
            ...todo,isdone:true,
         };
       })   
       );
   }

    return(
        <div>
        <h1>TODO APP</h1>
        <input placeholder="add a task" value={newTodos} onChange={updateTodoValue}></input>
        <button onClick={addNewTask} id='add'>Add Task</button>
        <br></br><br></br><br></br>
        <hr></hr>
        <h4>TODO-LIST</h4>
        <ul>
           {
            todos.map((todo)=>(
                <li key={todo.id}>
                    <span style={todo.isdone ? {textDecorationLine:"line-through"}:{}}>{todo.task}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <IconButton aria-label="delete" onClick={()=>deleteTodo(todo.id)}><DeleteIcon /></IconButton>
                    <button onClick={()=>markAsDone(todo.id)} id='done'>Mark As Done</button>
                    </li>
            ))}
        </ul>
        <br></br><br></br><br></br>
        <button onClick={markAllDone} id='done'>Mark All Done</button>
        </div>
    );
}