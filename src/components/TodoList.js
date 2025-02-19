import React, { useEffect, useState } from 'react';
import { getAllTodos, deleteTodo } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getAllTodos()
      .then(response => setTodos(response.data))
      .catch(error => console.error("Error fetching todos:", error));
  };

  const handleDelete = (id) => {
    deleteTodo(id)
      .then(() => fetchTodos())
      .catch(error => console.error("Error deleting todo:", error));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <button onClick={() => navigate('/add')}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task} {todo.completed ? "(Completed)" : "(Pending)"}
            <button onClick={() => navigate(`/edit/${todo.id}`)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
