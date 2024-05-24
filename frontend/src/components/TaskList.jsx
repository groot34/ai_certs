import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../api';
import toast from 'react-hot-toast';

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const tasks = await fetchTasks();
      setTasks(tasks);
    }
    loadTasks();
  }, []);

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
    toast.success("Task Deleted")
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border border-gray-600 p-4 mb-2 rounded-lg bg-gray-700">
            <h2 className="text-xl font-bold">{task.title}</h2>
            <p className="mb-2">{task.status} - {task.dueDate}</p>
            <div className="flex justify-end">
              <button onClick={() => onEdit(task.id)} className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
