import React, {useState, useRef, useEffect} from "react";


function usePreviousState(state) {
  const ref = useRef();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}


export default function Todo(task) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePreviousState(isEditing);

  const editTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={task.id}>
          New name for {task.name}
        </label>
        <input
          id={task.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
          data-testid="edit-task-input"
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
          data-testid="cancel-edit-button"
        >
          Cancel
          <span className="visually-hidden">renaming {task.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" data-testid="submit-edit-button">
          Save
          <span className="visually-hidden">new name for {task.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={task.id}
          type="checkbox"
          defaultChecked={task.done}
          onChange={() => task.toggleCompletedTask(task.id)}
          data-testid="done-checkbox"
        />
        <label className="todo-label" htmlFor={task.id} data-testid="task-name-og">
          {task.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          data-testid="start-edit-button"
        >
          Edit <span className="visually-hidden">{task.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => task.deleteTask(task.id)}
          data-testid="delete-button"
        >
          Delete <span className="visually-hidden">{task.name}</span>
        </button>
      </div>
    </div>
  );


  function handleChange(event) {
    setNewName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if(newName !== "")
      task.editTask(task.id, newName);
    else
      alert("Cannot add an empty task!!!");

    setNewName("");
    setEditing(false);
  }


  useEffect(() => {

    if(!wasEditing && isEditing)
      editFieldRef.current.focus();
    
    if(wasEditing && !isEditing)
      editButtonRef.current.focus();

  }, [wasEditing, isEditing]);
  
  return <li className="todo">{isEditing ? editTemplate : viewTemplate}</li>;

}
  