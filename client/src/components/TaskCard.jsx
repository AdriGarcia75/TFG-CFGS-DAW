import React, { useState } from 'react';

export default function TaskCard({ task }) {
  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div
      className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer border-slate-900"
      onClick={handleClick}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'}</p>
      <p className="text-sm">
        Status: <span className="font-medium">{task.status}</span>
      </p>
      <p className="text-sm">
        Priority: <span className="font-medium">{task.priority}</span>
      </p>

      {showDetail && (
        <div className="mt-2 p-2 bg-gray-100 rounded">
          {/* details - to do */}
          <p>{task.description || 'Sin descripción'}</p>
        </div>
      )}
    </div>
  );
}
