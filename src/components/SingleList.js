import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import{v4} from 'uuid'
import '../css/SingleList.css'
import {Button} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';



const SingleList = () => {
const navigate = useNavigate();
const [todos, setTodos] = useState([]);
const [input,setInput] = useState('');
const [isEditing, setIsEditing] = useState(false);
const [editRow, setEditRow] = useState('');
const [inputEdit, setInputEdit] = useState('');
const location = useLocation();
const listName = location.state.listName;
const listID = location.state.id;


  useEffect(()=>
    {
     const data = JSON.parse(localStorage.getItem(`todos/${listID}`))
        if (data)
         {
            setTodos(data)
         }
    },[listID]);

  useEffect(()=>
        {
            localStorage.setItem(`todos/${listID}`, JSON.stringify(todos))
        },[todos, listID]);



const handleFormSubmit = (e)=>{
    e.preventDefault();
    setTodos([...todos, {id: v4(), name: input, completed: false}]);
    setInput('');
};

const doneTodo = (id) =>{
    const editedTodos=todos.map(todo=>{
        if(todo.id===id){
            if(todo.completed===false){
                todo.completed=true;
            }else{
                todo.completed=false;
            }
        }
        return todo
    })
    setTodos(editedTodos);
};

const handleDelete = (id) =>{
    const filteredTodos = todos.filter((todo) =>
        {return todo.id!==id}
    )
    setTodos(filteredTodos);
};

const editFunction = (id) =>{
    setIsEditing(true);
    setEditRow(id);
};

const cancelEdit = () =>{
    setIsEditing(false);
};

const confirmEdit = (id) =>{
    const editedTodos=[...todos].map(todo=>{
        if(todo.id===id){
            todo.name=inputEdit;
        }
        return todo
    })
    setTodos(editedTodos);
    setEditRow(null);
    setInputEdit('');
};

const hoveredIcon = {
    cursor: 'pointer'
};

  return (
    <div className="list-container">
        <div className="todos-container">
            <h1>Todo List for {listName}</h1>
            <form className="add-list-form">
                <input
                    className="task-input"
                    placeholder="Add to list"
                    value={input}
                    onChange={e=>{setInput(e.target.value)}}>
                </input>
                <Button type="submit" onClick= {e=>handleFormSubmit(e)}variant="contained" disabled={!input}>Add Todo</Button>
             </form>
            <div className="todos">
                {todos.map(todo=>
                {
                    return(
                        isEditing && (editRow===todo.id) ?
                            <div className={todo.completed===true ? "todo-completed" : "todo"}
                                 key={todo.id}>
                                <input className="task-input"
                                       placeholder={todo.name}
                                       value={inputEdit}
                                       onChange={e=>setInputEdit(e.target.value)}/>
                               <ClearIcon style={hoveredIcon} fontSize="large" onClick={()=>cancelEdit()}/>
                               <CheckIcon style={hoveredIcon} fontSize="large" onClick={()=>confirmEdit(todo.id)}/>
                            </div>
                                :
                            <div className={todo.completed===true ? "todo-completed" : "todo" }
                                 key={todo.id}>
                                    <span className="todo-name">
                                        {todo.name}
                                    </span>
                                    <span style={{textAlign:'right'}}>
                                        {todo.completed===true ? 
                                         <CheckBoxIcon style={hoveredIcon} onClick={()=>doneTodo(todo.id, todo.completed)}/> :
                                         <CheckBoxOutlineBlankIcon style={hoveredIcon} onClick={()=>doneTodo(todo.id, todo.completed)}/>}
                                         <EditIcon style={hoveredIcon} onClick={()=>editFunction(todo.id)}/>
                                         <DeleteIcon style={hoveredIcon} onClick={()=>handleDelete(todo.id)}/>
                                    </span>
                                </div>    
                        )
                })}
            </div>
            <ArrowBackIcon style={hoveredIcon} onClick={()=>navigate('/')}/>
        </div>
    </div>
  )
}

export default SingleList;
