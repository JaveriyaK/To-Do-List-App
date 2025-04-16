import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/todos';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get(API).then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const res = await axios.post(API, { title });
    setTodos([...todos, res.data]);
    setTitle('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleComplete = async (todo) => {
    const res = await axios.put(`${API}/${todo._id}`, { ...todo, completed: !todo.completed });
    setTodos(todos.map(t => (t._id === todo._id ? res.data : t)));
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              onClick={() => toggleComplete(todo)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
