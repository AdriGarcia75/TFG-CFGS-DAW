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

  const apiUrl = "http://localhost:3000/api";

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
    } catch (error) {
      console.error('Error al cargar las columnas:', error);
    }
  };

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
      // this will always select the first board found
      setSelectedBoard(data[0]?.id || null);
      setLoading(false); 
    } catch (error) {
      console.error('Error al cargar los tableros:', error);
      setLoading(false); 
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

  const handleColumnCreate = async (e) => {
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
        setColumns([...columns, newColumn]);
        setNewColumnName('');
      } catch (error) {
        console.error('Error al crear la columna:', error);
      }
    }
  };

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
      columns={columns}
      boards={boards}
      onCreateColumn={handleColumnCreate}
      selectedBoard={selectedBoard}
      onBoardChange={handleBoardChange}
      newColumnName={newColumnName}
      setNewColumnName={setNewColumnName}
    >
      <div className="flex space-x-4 mt-6">
        <CreateBoardButton onCreateBoard={handleBoardCreate} />
        <CreateColumnButton
          onCreateColumn={handleColumnCreate}
          newColumnName={newColumnName}
          setNewColumnName={setNewColumnName}
          boards={boards}
        />
      </div>
    </DashboardView>
  );
}
