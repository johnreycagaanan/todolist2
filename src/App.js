import './css/App.css';
import{useState,useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TodoLists from './components/TodoLists';
import SingleList from './components/SingleList';

function App() {

const [todoLists, setTodoLists] = useState([]);
useEffect(()=>{
  const data = JSON.parse(localStorage.getItem('todoLists'))
  if (data){
    setTodoLists(data)
  }
},[]);

useEffect(()=>{
  localStorage.setItem('todoLists', JSON.stringify(todoLists))
},[todoLists]);


  return (
    <div className="App">
      <Router> 
        <Routes>     
          <Route path="/" element={<TodoLists todoLists={todoLists}
                 setTodoLists={setTodoLists}/>}/>
          <Route path="/:id" element={<SingleList/>}/>
        </Routes>     
      </Router>
    </div>
  );
}

export default App;
