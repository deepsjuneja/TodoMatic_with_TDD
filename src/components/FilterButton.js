import React from "react";

export default function FilterButton(filters) {    
    return (
        <button type="button" className="btn toggle-btn" aria-pressed={filters.isClicked} onClick={() => filters.setFilter(filters.name)}>
            <span className="visually-hidden">Show </span>
            <span>{filters.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}