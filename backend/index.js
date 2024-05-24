import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

import path, { dirname } from 'path';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let currentId = 1;
         
// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get a single task by ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const newTask = { id: currentId++, title, description, status, dueDate };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update an existing task by ID
app.put('/tasks/:id', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  task.title = title;
  task.description = description;
  task.status = status;
  task.dueDate = dueDate;
  res.json(task);
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const __filenameStatic=fileURLToPath(import.meta.url)
const __dirnameStatic=dirname(__filenameStatic)
app.use(express.static(path.join(__dirnameStatic,'.','/client/dist')))
app.use(express.static('dist'))

app.use((req,res)=>{
    res.sendFile(path.join(__dirnameStatic,'.','/dist','index.html'))
})
