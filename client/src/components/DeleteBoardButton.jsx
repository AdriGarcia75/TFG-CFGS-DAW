import React from 'react';

export default function DeleteBoardButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Eliminar Tablero
    </button>
  );
}
