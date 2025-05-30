import React, { useState } from 'react';
import TaskDetail from '../pages/TaskDetail';
import CreateTaskButton from './CreateTaskButton';
import CreateTask from './CreateTaskForm';
import CreateColumn from './CreateColumnForm';
import CreateBoard from './CreateBoardForm';
import ColumnComponent from './ColumnComponent';
import SelectBoard from './SelectBoard';
import DeleteBoardButton from './DeleteBoardButton';

export default function DashboardView({
  columns,
  boards,
  selectedBoard,
  onBoardChange,
  getTasksForColumn,
  selectedTask,
  onTaskSelect,
  onTaskClose,
  onTaskUpdate,
  onTaskDelete,
  onTaskCreate,
  onColumnChange,
  onDragStart,
  onDragOver,
  onDrop,
  onCreateColumn,
  onCreateBoard,
  onColumnDelete,
  onBoardDelete
}) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);

  const openCreateTaskModal = () => setIsCreateTaskModalOpen(true);
  const closeCreateTaskModal = () => setIsCreateTaskModalOpen(false);

  const openCreateColumnModal = () => setIsCreateColumnModalOpen(true);
  const closeCreateColumnModal = () => setIsCreateColumnModalOpen(false);

  const openCreateBoardModal = () => setIsCreateBoardModalOpen(true);
  const closeCreateBoardModal = () => setIsCreateBoardModalOpen(false);

  const handleCreateTask = (taskData) => {
    onTaskCreate(taskData);
    closeCreateTaskModal();
  };

  const handleCreateColumn = (columnData) => {
    onCreateColumn(columnData);
    closeCreateColumnModal();
  };

  const handleCreateBoard = (boardData) => {
    onCreateBoard(boardData);
    closeCreateBoardModal();
  };

  const handleDeleteBoard = () => {
    if (selectedBoard && window.confirm('¿Estás seguro de que deseas eliminar este tablero?')) {
      onBoardDelete(selectedBoard);
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">AnyTasks</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
          <SelectBoard
            boards={boards}
            selectedBoard={selectedBoard}
            onBoardChange={onBoardChange}
          />
          <button onClick={openCreateBoardModal} className="hover:bg-gray-700 p-2 rounded text-left">Crear Tablero</button>
          <button onClick={openCreateColumnModal} className="hover:bg-gray-700 p-2 rounded text-left">Crear Columna</button>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">Opciones</a>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-200 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex gap-2">
            <DeleteBoardButton onClick={handleDeleteBoard} />
            <CreateTaskButton onClick={openCreateTaskModal} />
          </div>
        </header>

        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-fit px-0 pb-4 h-[calc(100vh-100px)]">
            {columns.length === 0 ? (
              <div className="text-center w-full">
                <p>No hay columnas disponibles. ¡Selecciona un tablero o crea uno si no tienes!</p>
              </div>
            ) : (
              columns.map((col) => (
                <ColumnComponent
                  key={col.id}
                  column={col}
                  tasks={getTasksForColumn(col.id) || []}
                  onTaskSelect={onTaskSelect}
                  onTaskDelete={onTaskDelete}
                  onColumnChange={onColumnChange}
                  onColumnDelete={onColumnDelete}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                />
              ))
            )}
          </div>
        </div>
      </main>
      {/* task detail  */}
      {selectedTask && (
        <>
          {/* black overlay for styling */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onTaskClose} />
          <div className="fixed top-1/2 left-1/2 w-96 max-w-full bg-white rounded-lg shadow-xl z-50 p-6 transform -translate-x-1/2 -translate-y-1/2 overflow-auto max-h-[80vh]">
            <TaskDetail
              task={selectedTask}
              onClick={onTaskClose}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
            />
          </div>
        </>
      )}

      {isCreateTaskModalOpen && (
        <CreateTask
          onClose={closeCreateTaskModal}
          onCreate={handleCreateTask}
          columns={columns}
          boardId={selectedBoard}
        />
      )}

      {isCreateColumnModalOpen && (
        <CreateColumn
          onClose={closeCreateColumnModal}
          onCreate={handleCreateColumn}
        />
      )}

      {isCreateBoardModalOpen && (
        <CreateBoard
          onClose={closeCreateBoardModal}
          onCreate={handleCreateBoard}
        />
      )}
    </div>
  );
}
