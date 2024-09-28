import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();
  const API_URL = "/api/v1/todos";
  const API_KEY = "83LusZ_lcsJBQ75nnEIISVuVSjaTAFQ7znesUr07AkwadA39lQ";

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTodo(data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  const updateTodo = async () => {
    if (!todo) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) throw new Error("something went wrong");
      navigate("/");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Task</h1>
      <input
        type="text"
        defaultValue={todo.name}
        onChange={(e) => setTodo({ ...todo, name: e.target.value })}
        placeholder="Task Name"
      />
      <input
        type="text"
        defaultValue={todo.deadline}
        onChange={(e) => setTodo({ ...todo, deadline: e.target.value })}
        placeholder="Deadline"
      />
      <input
        type="text"
        defaultValue={todo.assignee}
        onChange={(e) => setTodo({ ...todo, assignee: e.target.value })}
        placeholder="Assignee"
      />
      <textarea
        defaultValue={todo.info}
        onChange={(e) => setTodo({ ...todo, info: e.target.value })}
        placeholder="Additional Information"
      />
      <button onClick={updateTodo}>Save Changes</button>
    </div>
  );
};

export default EditTodo;
