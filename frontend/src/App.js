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
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    await axios.post('http://localhost:5000/api/todos', { task });
    setTask('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
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

export default App;


