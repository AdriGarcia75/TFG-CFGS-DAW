import React from 'react';

export default function TaskDetailView({
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    status,
    setStatus,
    priority,
    setPriority,
    recurrence,
    setRecurrence,
    selectorOptions,
    handleSave,
    onClick,
}) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Editar tarea</h2>
                <button
                    onClick={onClick}
                    className="text-red-600 hover:text-red-800 font-semibold"
                    aria-label="Cerrar detalle tarea"
                >
                    ✕
                </button>
            </div>

            <div>
                <label className="font-semibold block mb-1">Título:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label className="font-semibold block mb-1">Descripción:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded resize-none"
                    rows={4}
                />
            </div>

            <div>
                <label className="font-semibold block mb-1">Fecha de vencimiento:</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label className="font-semibold block mb-1">Estado:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border p-2 rounded capitalize"
                >
                    {selectorOptions.status.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt.replace('_', ' ')}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="font-semibold block mb-1">Prioridad:</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border p-2 rounded capitalize"
                >
                    {selectorOptions.priority.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="font-semibold block mb-1">Recurrencia:</label>
                <select
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value)}
                    className="w-full border p-2 rounded capitalize"
                >
                    {selectorOptions.recurrence.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleSave}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
                Guardar cambios
            </button>
        </div>
    );
}
