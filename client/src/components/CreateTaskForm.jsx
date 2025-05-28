import React, { useState, useEffect } from 'react';

export default function CreateTask({ onClose, onCreate, columns, boardId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('pending');
  const [columnId, setColumnId] = useState(columns[0]?.id || '');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDueDate(today);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // prevent the sending of the form if any required fields are empty
    if (!title || !dueDate || !priority || !status || !columnId) return;

    onCreate({
      title,
      description,
      due_date: dueDate,
      status,
      priority,
      boardId,
      columnId,
    });

    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose} />
      <div className="fixed z-50 bg-white p-6 rounded-lg shadow-lg top-1/2 left-1/2 w-full max-w-md transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-xl font-semibold mb-4">Crear Nueva Tarea</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full border p-2 rounded">
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-2 rounded">
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completada</option>
          </select>

          <select value={columnId} onChange={(e) => setColumnId(e.target.value)} className="w-full border p-2 rounded">
            {columns.map(col => (
              <option key={col.id} value={col.id}>{col.name}</option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Crear
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
