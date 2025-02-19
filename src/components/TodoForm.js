import React, { useState, useEffect } from 'react';
import { createTodo, updateTodo, getTodo } from '../services/TodoService';
import { useNavigate, useParams } from 'react-router-dom';

const TodoForm = () => {
  const [task, setTask] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // If 'id' exists, we're editing an existing; fetch its details.
  useEffect(() => {
    if (id) {
      getTodo(id)
        .then(response => {
          setTask(response.data.task);
          setCompleted(response.data.completed);
        })
        .catch(error => console.error("Error fetching todo:", error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { task, completed };

    if (id) {
      updateTodo(id, todo)
        .then(() => navigate('/'))
        .catch(error => console.error("Error updating todo:", error));
    } else {
      createTodo(todo)
        .then(() => navigate('/'))
        .catch(error => console.error("Error creating todo:", error));
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Todo" : "Add Todo"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskInput">Task:</label>
          <input
            id="taskInput"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="completedCheckbox">Completed:</label>
          <input
            id="completedCheckbox"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default TodoForm;
