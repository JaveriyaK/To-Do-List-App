import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('https://to-do-list-app-ofd5.onrender.com/api/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    await axios.post('https://to-do-list-app-ofd5.onrender.com/api/todos', { task });
    setTask('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://to-do-list-app-ofd5.onrender.com/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="app-container">
      <h1>📝 To-Do List</h1>
      <div className="todo-input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.map((todo) => (
        <div key={todo._id} className="todo-item">
          <span>{todo.task}</span>
          <div className="todo-buttons">
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </div>
        </div>
      ))}
    </div>
  );
}






const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});


export default App;


