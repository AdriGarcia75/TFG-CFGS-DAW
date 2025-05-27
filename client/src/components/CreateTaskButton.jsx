import React from 'react';

export default function CreateTaskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Crear Tarea
    </button>
  );
}
