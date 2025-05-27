import React, { useState } from 'react';

export default function CreateColumnButton({ onCreateColumn }) {
  const [newColumnName, setNewColumnName] = useState('');

  const handleCreateColumn = () => {
    if (newColumnName.trim()) {
      onCreateColumn(newColumnName);
      setNewColumnName('');
    }
  };

  return (
    <div className="mb-4">
      <div className="w-full max-w-xs">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Nombre columna"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
      </div>
      <div className="mt-2 w-full max-w-xs">
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          onClick={handleCreateColumn}
        >
          Crear columna
        </button>
      </div>
    </div>
  );
}
