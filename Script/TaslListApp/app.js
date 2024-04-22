// This script implements a task list application built with React. 
// It manages tasks by allowing users to add, mark as completed, and remove tasks, 
// as well as filter tasks based on their completion status. 
// The application utilizes React hooks such as useState and useEffect for state management and side effects. 
// It includes components for adding tasks, filtering tasks, and displaying the task list. 
// The application also handles error messages for empty task descriptions and utilizes unique identifiers for each task.


import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [taskState, setTaskState] = useState({
    tasks: [],
    newTask: '',
    filter: 'all',
    error: null
  });
  
  // useEffect hook to load tasks from localStorage when the component mounts.
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTaskState((prevState) => ({
        ...prevState,
        tasks: JSON.parse(savedTasks)
      }));
    }
  }, []);

  // useEffect hook to save tasks to localStorage whenever the tasks state changes.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskState.tasks));
  }, [taskState.tasks]);

  const addTask = () => {
    if (!taskState.newTask.trim()) {
      setTaskState((prevState) => ({
        ...prevState,
        error: 'Task description cannot be empty.'
      }));
      return;
    }
    setTaskState((prevState) => ({
      ...prevState,
      error: null
    }));

    // Create a new task item with a unique ID, description, and completed status.
    const newTaskItem = {
      id: uuidv4(),
      description: taskState.newTask,
      completed: false
    };

    
    setTaskState((prevState) => ({
      ...prevState,
      tasks: [...prevState.tasks, newTaskItem],
      newTask: ''
    }));
  };

  // Function to mark a task as completed.
  const markAsCompleted = (id) => {
    setTaskState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    }));
  };
  
  // Function to remove a task from the tasks array.
  const removeTask = (id) => {
    setTaskState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id)
    }));
  };

  // Function to handle changes in the newTask input field.
  const handleChange = (event) => {
    setTaskState((prevState) => ({
      ...prevState,
      newTask: event.target.value
    }));
  };

  // Function to handle changes in the filter dropdown.
  const handleFilterChange = (filter) => {
    setTaskState((prevState) => ({
      ...prevState,
      filter: filter
    }));
  };

  // Variable to store tasks based on the selected filter.
  const filteredTasks = taskState.filter === 'completed' ? 
    taskState.tasks.filter((task) => task.completed) :
    taskState.filter === 'pending' ?
    taskState.tasks.filter((task) => !task.completed) :
    taskState.tasks;

  // Render the main component and its child components with JSX.
  return (
    <div className="app-container">
      <h1>Task List</h1>
      {/* Display error message if there is any */}
      {taskState.error && <p className="error">{taskState.error}</p>}
      {/* AddTaskForm component for adding new tasks */}
      <AddTaskForm
        addTask={addTask}
        newTask={taskState.newTask}
        handleChange={handleChange}
      />
      {/* TaskFilter component for filtering tasks */}
      <TaskFilter filter={taskState.filter} onFilterChange={handleFilterChange} />
      {/* TaskList component for displaying the list of tasks */}
      <TaskList
        tasks={filteredTasks}
        markAsCompleted={markAsCompleted}
        removeTask={removeTask}
      />
    </div>
  );
}

function AddTaskForm({ addTask, newTask, handleChange }) {
  // Function to handle form submission.
  const handleSubmit = (event) => {
    event.preventDefault();
    addTask();
  };

  // Render the form with JSX.
  return (
    <form onSubmit={handleSubmit}>
      {/* Label and input field for entering new task */}
      <label htmlFor="newTask">New Task:</label>
      <input
        type="text"
        id="newTask"
        placeholder="Enter a new task"
        value={newTask}
        onChange={handleChange}
      />
      {/* Button to submit the form */}
      <button type="submit" aria-label="Add Task">Add</button>
    </form>
  );
}

// Component for filtering tasks.
function TaskFilter({ filter, onFilterChange }) {
  // Function to handle filter change.
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  // Render the filter dropdown with JSX.
  return (
    <div>
      {/* Label and select dropdown for filtering tasks */}
      <label htmlFor="filter">Filter Tasks:</label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        {/* Options for filtering tasks */}
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

// Component for displaying the list of tasks.
function TaskList({ tasks, markAsCompleted, removeTask }) {
  // Render the list of tasks with JSX.
  return (
    <ul>
      {/* Map through tasks and render each task as a Task component */}
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          markAsCompleted={markAsCompleted}
          removeTask={removeTask}
        />
      ))}
    </ul>
  );
}

// Component for displaying an individual task.
function Task({ task, markAsCompleted, removeTask }) {
  // Render each task with JSX.
  return (
    <li className={task.completed ? 'completed' : ''}>
      {/* Display task description */}
      <span>{task.description}</span>
      {/* Button to mark task as completed */}
      <button onClick={() => markAsCompleted(task.id)} aria-label="Mark as Completed">Complete</button>
      {/* Button to remove task */}
      <button onClick={() => removeTask(task.id)} aria-label="Remove Task">Remove Task</button>
    </li>
  );
}

// Export the App component as default.
export default App;

