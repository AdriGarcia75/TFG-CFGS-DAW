import React from 'react';

export default function TaskDetail({ task, onClick }) {
  if (!task) return null;

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : 'Sin fecha';

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <button
          onClick={onClick}
          className="text-red-600 hover:text-red-800 font-semibold"
          aria-label="Cerrar detalle tarea"
        >
          ✕
        </button>
      </div>

      <div>
        <strong>Descripción:</strong>
        <p className="mt-1 whitespace-pre-wrap">
          {task.description || 'Sin descripción'}
        </p>
      </div>

      <div>
        <strong>Estado:</strong>
        <p className="capitalize">{task.status}</p>
      </div>

      <div>
        <strong>Prioridad:</strong>
        <p className="capitalize">{task.priority}</p>
      </div>

      <div>
        <strong>Fecha de vencimiento:</strong>
        <p>{formatDate(task.due_date)}</p>
      </div>

      <div>
        <strong>Recurrencia:</strong>
        <p className="capitalize">{task.recurrence}</p>
      </div>

      <div>
        <strong>Creada:</strong>
        <p>{formatDate(task.createdAt)}</p>
      </div>

      <div>
        <strong>Última actualización:</strong>
        <p>{formatDate(task.updatedAt)}</p>
      </div>
    </div>
  );
}
