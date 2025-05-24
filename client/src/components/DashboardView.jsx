import React from 'react';
import TaskCard from './TaskCard';
import TaskDetail from './TaskDetail';

export default function DashboardView({ columns,
  boards,
  selectedBoard,
  onBoardChange,
  children,
  getTasksForColumn,
  selectedTask,
  onTaskSelect,
  onTaskClose
}) {
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

      <main className="flex-1 bg-gray-200 p-6 overflow-auto">
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

        {/* here, the buttons will be shown */}
        {children}

        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-fit px-0 pb-4 h-[calc(100vh-100px)]">
            {columns.length === 0 ? (
              <div className="text-center w-full">
                <p>
                  No hay columnas disponibles. ¡Si es tu primera vez en AnyTasks,
                  clica en crear columnas!
                </p>
              </div>
            ) : (
              columns.map((col) => {
                const tasksForColumn = getTasksForColumn(col.id) || [];

                return (
                  <div
                    key={col.id}
                    className="w-64 flex-shrink-0 flex flex-col bg-gray-50 border-slate-900"
                    style={{ height: '100%' }}
                  >
                    <h2 className="text-xl font-bold mb-2">{col.name}</h2>
                    <div
                      className={`rounded p-4 space-y-4 flex-1 overflow-auto ${col.color || ''}`}
                    >
                      {tasksForColumn.length === 0 ? (
                        <p className="text-gray-500">No hay tareas en esta columna.</p>
                      ) : (
                        tasksForColumn.map((task) => (
                          // use the TaskCard component for every task
                          <TaskCard key={task.id} task={task} onClick={() => onTaskSelect(task)} />
                        ))
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* task detail  */}
      {selectedTask && (
        <>
          {/* black overlay for styling */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onTaskClose}
          />
          <div className="fixed top-1/2 left-1/2 w-96 max-w-full bg-white rounded-lg shadow-xl z-50 p-6 transform -translate-x-1/2 -translate-y-1/2 overflow-auto max-h-[80vh]">
            <TaskDetail task={selectedTask} onClick={onTaskClose} />
          </div>
        </>
      )}
    </div>
  );
}
