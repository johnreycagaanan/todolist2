import React,{useState} from 'react'
import{v4} from 'uuid'
import {useNavigate} from 'react-router-dom'
import {Button, FormControl,Input,InputLabel,List,ListItem,ListItemText,Typography} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../css/TodoLists.css'


const TodoLists = ({todoLists,setTodoLists}) => {
const navigate = useNavigate()
const [input,setInput] = useState('')
const [isEditing,setIsEditing] = useState(false)
const [editRow,setEditRow] = useState()
const [inputEdit,setInputEdit] = useState('')
// const [buttonDisabled,setButtonDisabled]=useState(true)
const handleSubmit = e =>{
    e.preventDefault()
    setTodoLists([...todoLists, {id: v4(), listName:input}])
    setInput('')
  }

  const editFunction = id =>{
    setIsEditing(true)
    setEditRow(id)
}

const handleDelete = id =>{
  const filteredTodoLists = todoLists.filter(todoList =>
      {return todoList.id!==id}
  )
  setTodoLists(filteredTodoLists)
}

  const cancelEdit = () =>{
    setIsEditing(false)
}

const confirmEdit = id =>{
  const editedTodoLists=[...todoLists].map(todoList=>{
      if(todoList.id===id){
          todoList.listName=inputEdit
      }
      return todoList
  })
  setTodoLists(editedTodoLists)
  setEditRow(null)
  setInputEdit('')
}

const handleOnClick =(id,listName)=>{
    navigate(`/${id}`, {state: {id, listName}})
}

  return (
    <div className="todo-page">
      <div className="todo-lists-container">
      <h1>Todo Lists</h1>
        {/* <form>
          <span className="add-list-form">
        <input 
         disable={!input}
         className="list-input"
         placeholder = "Create a todo list entry"
         value={input}
         onChange={e=>{setInput(e.target.value)}}
         />
        
  
         </span> */}
         
          <FormControl>
            <InputLabel htmlFor="my-input">Add a List</InputLabel>
            <Input id="my-input" value={input} onChange={e=>{setInput(e.target.value)}}/>
        </FormControl>
        <Button onClick= {e=>handleSubmit(e)}variant="contained" disabled={!input}>Add List</Button>
        
         <div className="todo-lists">
         <List>
         {todoLists.map(todoList=>{
            return (
              isEditing && (editRow===todoList.id) ? 
              <ListItem>
                <FormControl>
                   {/* <InputLabel htmlFor="my-input">Add a List</InputLabel> */}
                   <Input placeholder={todoList.listName} onChange={e=>{setInputEdit(e.target.value)}}/>
                 </FormControl>
                 <ClearIcon fontSize="large" onClick={()=>cancelEdit()}/>
                 <CheckIcon fontSize="large" onClick={()=>confirmEdit(todoList.id)}/>
              </ListItem>
              // <li
              // key={todoList.id}>
              //           <input
              //           placeholder={todoList.listName}
              //           className="list-item"
              //           value={inputEdit}
              //           onChange={e=>setInputEdit(e.target.value)}/>
              //           <ClearIcon fontSize="large" onClick={()=>cancelEdit()}/>
              //           <CheckIcon fontSize="large" onClick={()=>confirmEdit(todoList.id)}/>
              // </li> 
              :
              // <li key={todoList.id}>
              // <span className="list-name" onClick={()=>handleOnClick(todoList.id, todoList.listName)} >
              // {todoList.listName}
              // </span>
              // <EditIcon onClick={()=>editFunction(todoList.id)}/>
              // <DeleteIcon onClick={()=>handleDelete(todoList.id)}/>
              // </li>
                <ListItem>
                  {/* <ListItemText onClick={()=>handleOnClick(todoList.id, todoList.listName)} primary={todoList.listName} /> */}
                  <ListItemText
                       onClick={()=>handleOnClick(todoList.id, todoList.listName)}
                       disableTypography
                      primary={<Typography type="body2" style={{ color: 'black'}}>{todoList.listName}</Typography>}
                      />
                  <EditIcon onClick={()=>editFunction(todoList.id)}/>
                  <DeleteIcon onClick={()=>handleDelete(todoList.id)}/>
                </ListItem>
            )
         })}
                      </List>
                      </div>
        </div>
    </div>
  )
}

export default TodoLists