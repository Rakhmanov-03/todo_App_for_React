import React, { useEffect, useState } from 'react';
import "./App.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('All');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTask = () => {
    if (inputText.trim() === '') {
      alert('Vazifa kiritilishi shart');
      document.getElementById('taskInput').focus();
      return;
    }

    if (category === 'All') {
      alert('Kategoriya tanlanishi zarur');
      document.getElementById('categorySelect').focus();
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputText,
      category: category.toLowerCase(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputText('');
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = category === 'All' ? tasks : tasks.filter((task) => task.category === category);

  return (
    <div className='All'>
      <h1>{category === 'All' ? 'All Tasks' : `Tasks - ${category}`}</h1>
      <div>
        <label htmlFor="taskInput"></label>
        <input className='input'
          type="text"
          id="taskInput"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Add a new task inside category *"
        />
        <button className='btnaddTask' onClick={handleAddTask}>Add Task</button>
      </div>
      <label htmlFor="categorySelect"></label>
      <div className='select__ul'>
        <select className='select' id="categorySelect" onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="All">All</option>
          <option value="Groceries">Groceries</option>
          <option value="College">College</option>
          <option value="Payments">Payments</option>
        </select>
        <ul className='ul'>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              {task.text} - {task.category}
              <button className='btnDelete' onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
