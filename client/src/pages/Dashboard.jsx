import React, { useState, useEffect } from 'react';
import DashboardView from '../components/DashboardView';
import CreateColumnButton from '../components/createColumnButton';
import CreateBoardButton from '../components/CreateBoardButton';

export default function Dashboard() {
  const [columns, setColumns] = useState([]);
  const [boards, setBoards] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [tasksByColumn, setTasksByColumn] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);

  const apiUrl = "http://localhost:3000/api";

  function groupTasksByColumn(tasks) {
    return tasks.reduce((acc, task) => {
      if (!acc[task.columnId]) acc[task.columnId] = [];
      acc[task.columnId].push(task);
      return acc;
    }, {});
  }

  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/boards`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener los tableros');
      }
      const data = await response.json();
      setBoards(data);
      setSelectedBoard(data[0]?.id || null);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar los tableros:', error);
      setLoading(false);
    }
  };

  const fetchColumns = async (boardId) => {
    if (!boardId) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/columns?boardId=${boardId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener las columnas');
      }
      const data = await response.json();
      setColumns(data);

      fetchTasks(data);
    } catch (error) {
      console.error('Error al cargar las columnas:', error);
    }
  };

  const fetchTasks = async (columns) => {
    try {
      const token = localStorage.getItem('token');
      const columnIds = columns.map(c => c.id).join(',');

      const response = await fetch(`${apiUrl}/tasks?columnIds=${columnIds}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener tareas por múltiples columnas');
      }

      const data = await response.json();
      setTasks(data);

      setTasksByColumn(groupTasksByColumn(data));
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      fetchColumns(selectedBoard);
    }
  }, [selectedBoard]);

  const handleBoardCreate = async (boardName) => {
    if (boardName.trim()) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/boards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: boardName }),
        });

        if (!response.ok) {
          throw new Error('Error al crear el tablero');
        }

        const newBoard = await response.json();
        setBoards((prevBoards) => [...prevBoards, newBoard]);
      } catch (error) {
        console.error('Error al crear el tablero:', error);
      }
    }
  };

  const handleColumnCreate = async (newColumnName) => {
    if (newColumnName.trim() && selectedBoard) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/columns`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newColumnName,
            boardId: selectedBoard,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al crear la columna');
        }

        const newColumn = await response.json();
        setColumns(prevColumns => [...prevColumns, newColumn]);
      } catch (error) {
        console.error('Error al crear la columna:', error);
      }
    }
  };

  const handleBoardChange = (boardId) => {
    setSelectedBoard(boardId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <DashboardView
      boards={boards}
      columns={columns}
      tasks={tasks}
      selectedTask={selectedTask}
      onTaskSelect={setSelectedTask}
      onTaskClose={() => setSelectedTask(null)}
      getTasksForColumn={(columnId) => tasksByColumn[columnId] || []}
      selectedBoard={selectedBoard}
      onBoardChange={handleBoardChange}
    >
      <div className="flex space-x-4 mt-6">
        <CreateBoardButton onCreateBoard={handleBoardCreate} />
        <CreateColumnButton onCreateColumn={handleColumnCreate} />
      </div>
    </DashboardView>
  );
}