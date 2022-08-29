import React,{useState} from 'react'
import{v4} from 'uuid'
import {useNavigate} from 'react-router-dom'
import {Button} from '@mui/material'
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

const hoveredIcon = {
  cursor: 'pointer',
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
         <form className="add-list-form">
            <input
            className="task-input"
            placeholder="Add to list"
            value={input}
            onChange={e=>{setInput(e.target.value)}}>
            </input>
            <Button type="submit"onClick= {e=>handleSubmit(e)}variant="contained" disabled={!input}>Add List</Button>
            {/* <AddCircleOutlineIcon onClick={e=>handleFormSubmit(e)} fontSize='large'/> */}
        </form>
         
          {/* <FormControl>
            <InputLabel htmlFor="my-input">Add a List</InputLabel>
            <Input id="my-input" value={input} onChange={e=>{setInput(e.target.value)}}/>
        </FormControl> */}
        
        
         <div className="todo-lists">
         {/* <List> */}
         {todoLists.map(todoList=>{
            return (
              isEditing && (editRow===todoList.id) ? 
              <div className="todoList"
              key={todoList.id}
              >
                  <input className="task-input"
                  placeholder={todoList.listName}
                  value={inputEdit}
                  onChange={e=>setInputEdit(e.target.value)}/>
                  <ClearIcon style={hoveredIcon} fontSize="large" onClick={()=>cancelEdit()}/>
                  <CheckIcon style={hoveredIcon} fontSize="large" onClick={()=>confirmEdit(todoList.id)}/>
              </div>
              :
              <div className="todoList" key={todoList.id}>
                        <span style={{float: 'left'}}className="todoList-name" onClick={()=>handleOnClick(todoList.id,todoList.listName)}>
                            {todoList.listName}
                        </span>
                        <span style={{float:'right'}} className="edit-delete-button">
                        <EditIcon style={hoveredIcon} onClick={()=>editFunction(todoList.id)}/>
                        <DeleteIcon style={hoveredIcon} onClick={()=>handleDelete(todoList.id)}/>
                        </span>
                </div> 

            )
         })}
                      </div>
        </div>
    </div>
  )
}

export default TodoLists