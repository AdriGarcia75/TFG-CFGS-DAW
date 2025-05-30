import React, { useState, useEffect } from 'react';
import DashboardView from '../components/DashboardView';

export default function Dashboard() {
  const [columns, setColumns] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [tasksByColumn, setTasksByColumn] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // to correctly reload boardlist

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

      const storedBoardId = Number(localStorage.getItem('boardSeleccionado'));
      // if it exists and is valid, select the stored one, if not, select the first one
      if (storedBoardId && data.some(board => board.id === storedBoardId)) {
        setSelectedBoard(storedBoardId);
      } else {
        console.log(typeof data[0]?.id )
        setSelectedBoard(data[0]?.id || null);
      }

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

  // use effects for the logic of reloading certain parts of the app
  useEffect(() => {
    fetchBoards();
  }, [refreshKey]);

  useEffect(() => {
    if (selectedBoard) {
      fetchColumns(selectedBoard);
    } else {
      setColumns([]);
      setTasks([]);
      setTasksByColumn({});
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

  const handleTaskCreate = async (taskData) => {
    try {
      const token = localStorage.getItem('token');

      // decode the jwt token to get the current user ID
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));

      const userId = payload.id;

      const response = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...taskData,
          userId,
        }),
      });

      if (!response.ok) throw new Error('Error al crear la tarea');

      const newTask = await response.json();
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTasksByColumn(groupTasksByColumn(updatedTasks));
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  const handleBoardChange = (boardId) => {
    setSelectedBoard(boardId);
    localStorage.setItem('boardSeleccionado', boardId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  const handleBoardDelete = async (boardId) => {
    try {
      const token = localStorage.getItem('token');

      const columnsResponse = await fetch(`${apiUrl}/columns?boardId=${boardId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!columnsResponse.ok) throw new Error('Error al obtener columnas del tablero');
      const columnsToDelete = await columnsResponse.json();

      for (const column of columnsToDelete) {
        await handleColumnDelete(column.id);
      }

      const deleteBoardResponse = await fetch(`${apiUrl}/boards/${boardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!deleteBoardResponse.ok) throw new Error('Error al eliminar el tablero');

      // select the first board if possible only if the selected one was selected
      setBoards(prevBoards => {
        const updatedBoards = prevBoards.filter(board => board.id !== boardId);

        if (selectedBoard === boardId) {
          setSelectedBoard(updatedBoards[0]?.id || null);
        }

        return updatedBoards;
      });

      setRefreshKey(prev => prev + 1); // force reload of the board list

    } catch (error) {
      console.error('Error al eliminar el tablero:', error);
    }
  };

  const handleColumnChange = async (updatedColumn) => {
    if (!updatedColumn.name.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/columns/${updatedColumn.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: updatedColumn.name.trim() }),
      });

      if (!response.ok) throw new Error('Error al actualizar la columna');

      const updated = await response.json();

      setColumns(prev =>
        prev.map(col => (col.id === updated.id ? updated : col))
      );

      handleTasksUpdateByColumn(updated.id, updated.name);
    } catch (error) {
      console.error('Error al actualizar el nombre de la columna:', error);
    }
  };

  const handleColumnDelete = async (columnId) => {
    try {
      const token = localStorage.getItem('token');
      const tasksResponse = await fetch(`${apiUrl}/tasks?columnId=${columnId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!tasksResponse.ok) throw new Error('Error al obtener tareas de la columna');
      const tasksToDelete = await tasksResponse.json();

      for (const task of tasksToDelete) {
        await fetch(`${apiUrl}/tasks/${task.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const response = await fetch(`${apiUrl}/columns/${columnId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Error al eliminar la columna');

      setColumns(prevColumns => prevColumns.filter(col => col.id !== columnId));
      setTasks(prevTasks => {
        const remainingTasks = prevTasks.filter(task => task.columnId !== columnId);
        setTasksByColumn(groupTasksByColumn(remainingTasks));
        return remainingTasks;
      });
    } catch (error) {
      console.error('Error al eliminar la columna:', error);
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasksByColumn(groupTasksByColumn(newTasks));
      return newTasks;
    });
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }

      setTasks((prevTasks) => {
        const filteredTasks = prevTasks.filter(task => task.id !== taskId);
        setTasksByColumn(groupTasksByColumn(filteredTasks));
        return filteredTasks;
      });

    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleTasksUpdateByColumn = (columnId, newColumnName) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.columnId === columnId ? { ...task, status: newColumnName } : task
      );
      setTasksByColumn(groupTasksByColumn(updatedTasks));
      return updatedTasks;
    });
  };

  // drag and drop logic
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // needed for the drop logic
  };

  const handleDrop = async (e, targetColumnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const taskIdNum = Number(taskId);

    // find the target column ID
    const targetColumn = columns.find(col => col.id === targetColumnId);
    if (!targetColumn) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/tasks/${taskIdNum}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          columnId: targetColumnId,
          status: targetColumn.name,
        }),
      });
      if (!response.ok) throw new Error('Error al actualizar la tarea');

      const updatedTask = await response.json();

      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task =>
          task.id === taskIdNum ? updatedTask : task
        );
        setTasksByColumn(groupTasksByColumn(updatedTasks));
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error al actualizar la tarea al moverla:', error);
    }
  };

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
      onTaskUpdate={handleTaskUpdate}
      onTaskCreate={handleTaskCreate}
      onTaskDelete={handleTaskDelete}
      onColumnChange={handleColumnChange}
      onColumnDelete={handleColumnDelete}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onCreateBoard={handleBoardCreate}
      onCreateColumn={handleColumnCreate}
      onBoardDelete={handleBoardDelete}
    >
    </DashboardView>
  );
}
