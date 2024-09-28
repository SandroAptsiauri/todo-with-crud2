import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const API_URL = "/api/v1/todos";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = "83LusZ_lcsJBQ75nnEIISVuVSjaTAFQ7znesUr07AkwadA39lQ";
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
    setIsLoading(false);
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id, isCompleted) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: !isCompleted }),
      });
      if (response.ok) {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
          )
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h1>TODO List</h1>
      <button onClick={() => navigate("/add")}>Add Task</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "",
                }}
              >
                {todo.name}
              </span>
              <button onClick={() => navigate(`/edit/${todo.id}`)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => toggleComplete(todo.id, todo.isCompleted)}>
                {todo.isCompleted ? "Mark Incomplete" : "Mark Complete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;
