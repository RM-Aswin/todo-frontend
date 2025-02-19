import axios from 'axios';

const API_URL = 'http://localhost:8080/api/todos';

// Fetch all todos
export const getAllTodos = () => axios.get(API_URL);

// Create a new 
export const createTodo = (todo) => axios.post(API_URL, todo);

// Update a 
export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);

// Delete a 
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);

export const getTodo = (id) => axios.get(`${API_URL}/${id}`);