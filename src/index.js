import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';

const TASKS = [
  { name : "Eat", done : false, id : "task-0" },
  { name : "Sleep", done : false, id : "task-1" },
  { name : "Code", done : false, id : "task-2" },
  { name : "Repeat", done : true, id : "task-3" }
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks = {TASKS} />
  </React.StrictMode>
);