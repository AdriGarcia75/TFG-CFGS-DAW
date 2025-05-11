const { Board } = require('../models');

const createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ error: 'Se necesita un nombre para el tablero.' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const newBoard = await Board.create({
      name,
      description: description || "Descripción vacía",
      userId,
    });

    return res.status(201).json(newBoard);
  } catch (error) {
    console.error('Error al crear el tablero', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll();
    return res.status(200).json(boards);
  } catch (error) {
    console.error('Error al obtener los tableros', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { name, description } = req.body;

    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Tablero no encontrado.' });
    }

    board.name = name || board.name;
    board.description = description || board.description;

    await board.save();
    return res.status(200).json(board);
  } catch (error) {
    console.error('Error al actualizar el tablero', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Tablero no encontrado.' });
    }

    await board.destroy();
    return res.status(200).json({ message: 'Tablero eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el tablero', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
};
