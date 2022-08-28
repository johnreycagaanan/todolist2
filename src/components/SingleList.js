import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import{v4} from 'uuid'



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
    // console.log(listID)
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
    <div>
        <h1>Todo List for {listName}</h1>
        <form>
            <input
            placeholder="Add to list"
            value={input}
            onChange={e=>{setInput(e.target.value)}}>
            </input>
            <button onClick={e=>handleFormSubmit(e)}>Add</button>
        </form>
        <div>
            {todos.map(todo=>{
                return(
                    isEditing && (editRow===todo.id)? <div
                    key={todo.id}
                    >
                        <input
                        value={inputEdit}
                        onChange={e=>setInputEdit(e.target.value)}/>
                        <button onClick={()=>cancelEdit()}>Cancel</button>
                        <button onClick={()=>confirmEdit(todo.id)}>Confirm Edit</button>
                    </div>: <div key={todo.id}>
                    {todo.name}
                    <button onClick={()=>editFunction(todo.id)}>Edit</button>
                    <button onClick={()=>handleDelete(todo.id)}>Delete</button>
                </div>     
                )
            })}
        </div>
        <div>
         <button onClick={()=>navigate('/')}>BACK TO HOME</button>
        </div>
    </div>
  )
}

export default SingleList
