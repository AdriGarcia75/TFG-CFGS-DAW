import React, { useState } from 'react';
import TaskDetail from '../pages/TaskDetail';
import CreateTaskButton from './CreateTaskButton';
import CreateTask from './CreateTaskForm';
import CreateColumn from './CreateColumnForm';
import CreateBoard from './CreateBoardForm';
import ColumnComponent from './ColumnComponent';
import SelectBoard from './SelectBoard';
import DeleteBoardButton from './DeleteBoardButton';

import "../main.css";

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
    if (selectedBoard && window.confirm('Se eliminará el tablero actual.\n¿Estás seguro de que deseas eliminar este tablero?')) {
      onBoardDelete(selectedBoard);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar (lateral en desktop, arriba en móvil) */}
      <aside className="sidebar bg-gray-950 text-white flex flex-col p-4 gap-4 shadow-lg">
        <h2 className="text-2xl font-extrabold mb-4 tracking-tight">AnyTasks</h2>
        <nav className="flex flex-col gap-2">
          <SelectBoard
            boards={boards}
            selectedBoard={selectedBoard}
            onBoardChange={onBoardChange}
          />
          <button onClick={openCreateBoardModal} className="hover:bg-gray-800 bg-gray-900 p-2 rounded-md transition">Crear Tablero</button>
          <button onClick={openCreateColumnModal} className="hover:bg-gray-800 bg-gray-900 p-2 rounded-md transition">Crear Columna</button>
          <button className="hover:bg-gray-800 bg-gray-900 p-2 rounded-md transition">Perfil</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content bg-gradient-to-t sm:bg-gradient-to-l from-gray-900 via-gray-700 to-gray-100 p-6 overflow-auto min-h-screen">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black tracking-wide">Dashboard</h1>
          <div className="flex gap-2">
            <DeleteBoardButton
              onClick={handleDeleteBoard}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            />
            <CreateTaskButton
              onClick={openCreateTaskModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            />
          </div>
        </header>

        <div className="overflow-x-auto">
          <div className="columns-container flex gap-6">
            {columns.length === 0 ? (
              <div className="text-center w-full text-white">
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
          <div className="fixed top-1/2 left-1/2 w-96 max-w-full bg-white rounded-2xl shadow-2xl z-50 p-6 transform -translate-x-1/2 -translate-y-1/2 overflow-auto max-h-[80vh]">
            <TaskDetail
              task={selectedTask}
              onClick={onTaskClose}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
            />
          </div>
        </>
      )}

      {/* create task */}
      {isCreateTaskModalOpen && (
        <CreateTask
          onClose={closeCreateTaskModal}
          onCreate={handleCreateTask}
          columns={columns}
          boardId={selectedBoard}
        />
      )}

      {/* create column */}
      {isCreateColumnModalOpen && (
        <CreateColumn
          onClose={closeCreateColumnModal}
          onCreate={handleCreateColumn}
        />
      )}

      {/* create board */}
      {isCreateBoardModalOpen && (
        <CreateBoard
          onClose={closeCreateBoardModal}
          onCreate={handleCreateBoard}
        />
      )}
    </div>
  );
}
