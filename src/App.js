import React, {useState, useRef, useEffect} from "react";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.done,
  Completed: (task) => task.done
};

const FILTERS = Object.keys(FILTER_MAP);

function usePreviousState(state) {
  const ref = useRef();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}

function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  const tasksList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo 
      name = {task.name}
      done = {task.done}
      id = {task.id}
      key = {task.id}
      toggleCompletedTask = {toggleCompletedTask}
      deleteTask = {deleteTask}
      editTask = {editTask}
    />
  ));

  const filteredTasksList = FILTERS.map((filterName) => (
    <FilterButton
      key = {filterName}
      name = {filterName}
      isClicked = {filterName === filter}
      setFilter = {setFilter}
    />
  ));

  function toggleCompletedTask(id) {

    const updatedTasks = tasks.map((task) => {
      if (id === task.id)
        return {...task, done: !task.done};

      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTasksList = tasks.map((task) => {
      if(id === task.id)
        return {...task, name: newName};
      
      return task;
    });

    setTasks(editedTasksList);
  }

  function addNewTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, done: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = tasksList.length === 1 ? 'task' : 'tasks';
  const headingText = `${tasksList.length} ${tasksNoun}`;

  const listHeadingRef = useRef(null);
  const prevTasksLength = usePreviousState(tasks.length);

  useEffect(() => {

    if(tasks.length - prevTasksLength === -1)
      listHeadingRef.current.focus();

  }, [tasks.length, prevTasksLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addNewTask = {addNewTask} />
      <div className="filters btn-group stack-exception">
        {filteredTasksList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasksList}
      </ul>
    </div>
  );
}

export default App;
