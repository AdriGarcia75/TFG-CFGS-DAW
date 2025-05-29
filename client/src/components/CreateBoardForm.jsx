import React, { useState } from 'react';

export default function CreateBoard({ onClose, onCreate }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim());
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed z-50 bg-white p-6 rounded-lg shadow-lg top-1/2 left-1/2 w-full max-w-sm transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-xl font-semibold mb-4">Crear Nuevo Tablero</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del tablero"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-4"
            autoFocus
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
