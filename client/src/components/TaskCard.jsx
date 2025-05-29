export default function TaskCard({ task, onClick, onDelete, onDragStart }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id); // save the task id
    if (onDragStart) onDragStart(e, task.id);
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer relative"
      onClick={() => onClick(task)}
    >
      <button
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg font-bold"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        aria-label="Eliminar tarea"
      >
        ×
      </button>
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">
        Fecha de vencimiento: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'}
      </p>
      <p className="text-sm">
        Estado: <span className="font-medium">{task.status}</span>
      </p>
      <p className="text-sm">
        Prioridad: <span className="font-medium">{task.priority}</span>
      </p>
    </div>
  );
}
