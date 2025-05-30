import React, { useState, useEffect } from 'react';

export default function CreateTask({ onClose, onCreate, columns, boardId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('media');
  const [status, setStatus] = useState('');
  const [selectorOptions, setSelectorOptions] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDueDate(today);
  }, []);

  useEffect(() => {
    const fetchOptionsSelector = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3000/api/tasks/selectorOptions?boardId=${boardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setSelectorOptions(data);
        if (data.status.length > 0) setStatus(data.status[0].name);
      } catch (error) {
        console.error('Error al obtener los valores para los selectores', error);
      }
    };

    fetchOptionsSelector();
  }, [boardId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate || !priority || !status) return;

    const selectedColumn = selectorOptions.status.find(s => s.name === status);

    onCreate({
      title,
      description,
      due_date: dueDate,
      status,
      priority,
      boardId,
      columnId: selectedColumn ? selectedColumn.id : null,
    });

    onClose();
  };

  if (!selectorOptions) return null;
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
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full border p-2 rounded capitalize"
          >
            {selectorOptions.status.map(opt => (
              <option key={opt.id} value={opt.name}>
                {opt.name.replace('_', ' ')}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
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
