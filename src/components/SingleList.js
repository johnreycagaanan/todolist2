import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import{v4} from 'uuid'
import '../css/SingleList.css'
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const SingleList = () => {
const navigate = useNavigate()
const [todos, setTodos] = useState([])
const [input,setInput] = useState('')
const [isEditing, setIsEditing] = useState(false)
const [editRow, setEditRow] = useState('')
const [inputEdit, setInputEdit] = useState('')
const location = useLocation()
const listName = location.state.listName
const listID = location.state.id


useEffect(()=>{
    const data = JSON.parse(localStorage.getItem(`todos/${listID}`))
    if (data){
      setTodos(data)
    }
    // eslint-disable-next-line
  },[])
  useEffect(()=>{
    // eslint-disable-next-line
    localStorage.setItem(`todos/${listID}`, JSON.stringify(todos))
    // eslint-disable-next-line
  },[todos])



const handleFormSubmit = (e)=>{
    e.preventDefault()
    console.log(input)
    setTodos([...todos, {id: v4(), name: input}])
    setInput('')
}

const handleDelete = id =>{
    const filteredTodos = todos.filter((todo) =>
        {return todo.id!==id}
    )
    setTodos(filteredTodos)
}

const editFunction = id =>{
    setIsEditing(true)
    setEditRow(id)
}
const cancelEdit = () =>{
    setIsEditing(false)
}

const confirmEdit = id =>{
    const editedTodos=[...todos].map(todo=>{
        if(todo.id===id){
            todo.name=inputEdit
        }
        return todo
    })
    setTodos(editedTodos)
    setEditRow(null)
    setInputEdit('')
}

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
            <AddCircleOutlineIcon onClick={e=>handleFormSubmit(e)} fontSize='large'/>
        </form>
        <div className="todos">
            {todos.map(todo=>{
                return(
                    isEditing && (editRow===todo.id)? <div
                    key={todo.id}
                    >
                        <input className="task-input"
                        placeholder={todo.name}
                        value={inputEdit}
                        onChange={e=>setInputEdit(e.target.value)}/>
                        <ClearIcon fontSize="large" onClick={()=>cancelEdit()}/>
                        <CheckIcon fontSize="large" onClick={()=>confirmEdit(todo.id)}/>
                    </div>: <div className="todo" key={todo.id}>
                        <span className="todo-name">
                            {todo.name}
                        </span>
                        <EditIcon onClick={()=>editFunction(todo.id)}/>
                        <DeleteIcon onClick={()=>handleDelete(todo.id)}/>
                </div>     
                )
            })}
        </div>
        
         {/* <button className = "button-back" onClick={()=>navigate('/')}>BACK TO HOME</button> */}
        <ArrowBackIcon onClick={()=>navigate('/')}/>
    </div>
    </div>
  )
}

export default SingleList
