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
    <div className="flex flex-col gap-2 items-center mb-4">
      <div className="w-full max-w-xs">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Nombre tablero"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
      </div>
      <div className="mt-2 w-full max-w-xs">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          onClick={handleCreateBoard}
        >
          Crear tablero
        </button>
      </div>
    </div>
  );
}
