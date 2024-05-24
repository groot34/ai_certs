import React, { useState, useEffect } from 'react';
import { createTask, updateTask, fetchTask } from '../api';
import toast from 'react-hot-toast';

function TaskForm({ taskId, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (taskId) {
      async function loadTask() {
        const task = await fetchTask(taskId);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(task.dueDate);
      }
      loadTask();
    }
  }, [taskId]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newTask = { title, description, status, dueDate };
    try {
      if (taskId) {
        await updateTask(taskId, newTask);
        toast.success("Task Updated")
      } else {
        await createTask(newTask);
        toast.success("Task Created")
      }
      onSave();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <input value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Status</label>
        <input value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Due Date</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required />
      </div>
      <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded">Save Task</button>
    </form>
  );
}

export default TaskForm;
