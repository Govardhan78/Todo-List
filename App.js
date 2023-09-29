import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [taskText, setTaskText] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (taskText.trim() !== "") {
      const newTask = { text: taskText, completed: false };
      setTasks([...tasks, newTask]);
      setTaskText("");
    }
  };

  // Mark a task as completed
  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task, index) => index !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand mb-0 h1" href="#">
            Todo List
          </a>
        </div>
      </nav>

      <h1 className="text-center">Todo List</h1>

      <div className="container">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Enter Task..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button
            class="btn btn-outline-secondary  "
            type="button"
            id="button-addon2"
            onClick={addTask}
          >
            Add
          </button>
        </div>
      </div>

      <div className="container">
        <Button className="my-4" onClick={() => setViewCompleted(false)}>
          All Task
        </Button>
        <Button className="ms-3 my-4" onClick={() => setViewCompleted(true)}>
          Completed
        </Button>
      </div>

      <ul class="list-group">
  {tasks.map((task, index) => {
    if (viewCompleted && !task.completed) {
      return null; // Skip rendering incomplete tasks in "Completed Tasks" view
    }
    return (
      <li class="list-group-item mb-2 ms-5 me-5" key={index}>
        <input
          type="checkbox"
          className="me-4"
          checked={task.completed}
          onChange={() => toggleComplete(index)}
        />
        {task.text}
        <button
          class="btn btn-danger position-absolute top-0 end-0"
          onClick={() => deleteTask(index)}
        >
          Delete
        </button>
      </li>
    );
  })}
</ul>

    </div>
  );
}

export default TaskApp;
