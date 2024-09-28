import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState({
    name: "",
    deadline: "",
    assignee: "",
    info: "",
  });
  const navigate = useNavigate();
  const API_URL = "/api/v1/todos";
  const API_KEY = "83LusZ_lcsJBQ75nnEIISVuVSjaTAFQ7znesUr07AkwadA39lQ";

  const addTodo = async () => {
    if (newTodo.name.trim() === "") return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify([{ newTodo }]),
      });
      if (!response.ok) throw new Error("something went wrong");
      navigate("/");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div>
      <h1>Add New Task</h1>
      <input
        type="text"
        value={newTodo.name}
        onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        placeholder="Task Name"
      />
      <input
        type="text"
        value={newTodo.deadline}
        onChange={(e) => setNewTodo({ ...newTodo, deadline: e.target.value })}
        placeholder="Deadline"
      />
      <input
        type="text"
        value={newTodo.assignee}
        onChange={(e) => setNewTodo({ ...newTodo, assignee: e.target.value })}
        placeholder="Assignee"
      />
      <textarea
        value={newTodo.info}
        onChange={(e) => setNewTodo({ ...newTodo, info: e.target.value })}
        placeholder="Additional Information"
      />
      <button onClick={addTodo}>Add Task</button>
    </div>
  );
};

export default AddTodo;
