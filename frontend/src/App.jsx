import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  function handleSave() {
    setShowForm(false);
    setTaskToEdit(null);
  }

  function handleEdit(id) {
    setTaskToEdit(id);
    setShowForm(true);
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <Toaster />
      {showForm ? (
        <TaskForm taskId={taskToEdit} onSave={handleSave} />
      ) : (
        <>
          <button
            onClick={() => setShowForm(true)}
            className="mb-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
          >
            New Task
          </button>
          <TaskList onEdit={handleEdit} />
        </>
      )}
    </div>
  );
}

export default App;
