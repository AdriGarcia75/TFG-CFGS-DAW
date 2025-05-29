import React, { useState } from 'react';
import TaskCard from './TaskCard';

export default function ColumnComponent({
  column,
  tasks,
  onTaskSelect,
  onTaskDelete,
  onColumnChange,
  onColumnDelete,
  onDragOver,
  onDrop,
  onDragStart
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.name);

  const handleTitleClick = () => setIsEditing(true);

  const finishEditing = () => {
    setIsEditing(false);
    const trimmedTitle = title.trim();
    if (trimmedTitle && trimmedTitle !== column.name) {
      const updatedColumn = { ...column, name: trimmedTitle };
      onColumnChange(updatedColumn);
    } else {
      setTitle(column.name); // revert if empty or no changes
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTitle(column.name);
    }
  };

  // control the drag over to intercept the changes
  const handleDragOver = (e) => {
    e.preventDefault();
    if (onDragOver) onDragOver(e);
  };

  return (
    <div
      key={column.id}
      className="w-64 flex-shrink-0 flex flex-col bg-gray-50 border-slate-900 relative"
      style={{ height: '100%' }}
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="mb-2 flex justify-between items-center">
        {isEditing ? (
          <input
            className="text-xl font-bold w-full border rounded p-1"
            value={title}
            autoFocus
            onChange={e => setTitle(e.target.value)}
            onBlur={finishEditing}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h2
            className="text-xl font-bold cursor-pointer flex-1"
            onClick={handleTitleClick}
          >
            {column.name}
          </h2>
        )}
        <button
          className="text-red-500 hover:text-red-700 ml-2 text-lg font-bold"
          onClick={() => {
            if (window.confirm("¿Estás seguro de que quieres eliminar esta columna?")) {
              onColumnDelete(column.id);
            }
          }}
          title="Eliminar columna"
        >
          ×
        </button>
      </div>

      <div className={`rounded p-4 space-y-4 flex-1 overflow-auto ${column.color || ''}`}>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No hay tareas en esta columna.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskSelect(task)}
              onDelete={onTaskDelete}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
}
