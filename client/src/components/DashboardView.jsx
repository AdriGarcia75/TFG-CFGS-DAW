import React from 'react';

export default function DashboardView({ columns, boards, selectedBoard, onBoardChange, children }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">AnyTasks</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">Proyectos</a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">Opciones</a>
        </nav>
        
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>

        {/* list of boards */}
        <select
          className="w-auto p-2 border rounded"
          value={selectedBoard || ""}
          onChange={(e) => onBoardChange(e.target.value)}
        >
          <option value="" disabled>Seleccionar tablero</option>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>

        {/* here, the createColumns button will be shown */}
        {children}

        <div className="grid grid-cols-3 gap-6">
          {columns.length === 0 ? (
            <div className="col-span-3 text-center">
              <p>
                No hay columnas disponibles. ¡Si es tu primera vez en AnyTasks,
                clica en crear columnas!
              </p>
            </div>
          ) : (
            columns.map((col, idx) => (
              <div key={idx} className="flex flex-col">
                <h2 className="text-xl font-bold mb-2">{col.name}</h2>
                <div className={`rounded p-4 space-y-4 ${col.color}`}>
                  {col.tasks &&
                    col.tasks.map((task, i) => (
                      <div
                        key={i}
                        className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer"
                      >
                        {task.title}
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
