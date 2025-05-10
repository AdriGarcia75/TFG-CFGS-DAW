import React, { useState } from 'react';

export default function CreateBoardButton({ onCreateBoard }) {
  const [newBoardName, setNewBoardName] = useState('');

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      onCreateBoard(newBoardName);
      setNewBoardName('');
    }
  };

  return (
    <div className="mb-4">
      <div className="w-full max-w-xs">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Nombre columna"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
      </div>
      <div className="mt-2 w-full max-w-xs">
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          onClick={handleCreateBoard}
        >
          Crear columna
        </button>
      </div>
    </div>
  );
}
