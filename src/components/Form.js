import React, {useState} from "react";

export default function Form(task) {

    const [name, setName] = useState("");

    function handleChange(event) {
        setName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if(name !== "")
            task.addNewTask(name);
        else
            alert("Cannot add an empty task!!!");
            
        setName("");
    }

    return (
        <form onSubmit = {handleSubmit}>
            <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
                Add a new task:
            </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
                data-testid="new-todo-task-input"
            />
            <button type="submit" className="btn btn__primary btn__lg" data-testid="submitButton">
                Add
            </button>
        </form>
    );
}