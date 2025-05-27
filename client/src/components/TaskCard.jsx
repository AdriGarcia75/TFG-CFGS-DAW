import React from 'react';

export default function TaskCard({ task, onClick, onDelete }) {
  return (
    <div
      className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer relative"
      onClick={() => onClick(task)}
    >
      <button
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg font-bold"
        onClick={(e) => {
          e.stopPropagation(); //prevent the button to open the task
          onDelete(task.id);
        }}
        aria-label="Eliminar tarea"
      >
        ✕
      </button>
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">
        Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'}
      </p>
      <p className="text-sm">
        Status: <span className="font-medium">{task.status}</span>
      </p>
      <p className="text-sm">
        Priority: <span className="font-medium">{task.priority}</span>
      </p>
    </div>
  );
}
