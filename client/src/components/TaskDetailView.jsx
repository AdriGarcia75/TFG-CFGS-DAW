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
    selectorOptions = { status: [], priority: [] },
    handleSave,
    handleDelete,
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
            <div className="flex justify-end gap-4 mt-4">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Guardar
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}
