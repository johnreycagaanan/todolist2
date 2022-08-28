import React,{useState} from 'react'
import{v4} from 'uuid'
import {useNavigate} from 'react-router-dom'


const TodoLists = ({todoLists,setTodoLists}) => {
const navigate = useNavigate()
const [input,setInput] = useState('')
const [isEditing,setIsEditing] = useState(false)
const [editRow,setEditRow] = useState()
const [inputEdit,setInputEdit] = useState('')
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
    <div>
      <h1>TodoLists</h1>
        <form onSubmit={e=>handleSubmit(e)}>
      <input 
         placeholder = "Create another list"
         value={input}
         onChange={e=>{setInput(e.target.value)}}/>
         <button>Add list</button>
         </form>
         {todoLists.map(todoList=>{
            return (
              isEditing && (editRow===todoList.id)? <div key={todoList.id}>
                        <input
                        value={inputEdit}
                        onChange={e=>setInputEdit(e.target.value)}/>
                        <button onClick={()=>cancelEdit()}>Cancel</button>
                        <button onClick={()=>confirmEdit(todoList.id)}>Confirm Edit</button>
              </div> :
              <div  key={todoList.id}>
                
              <h3 onClick={()=>handleOnClick(todoList.id, todoList.listName)} >
              {todoList.listName}
              </h3>
              
              <button onClick={()=>editFunction(todoList.id)}>Edit</button>
              <button onClick={()=>handleDelete(todoList.id)}>Delete</button>
              </div>
            )
         })}
    </div>
  )
}

export default TodoLists