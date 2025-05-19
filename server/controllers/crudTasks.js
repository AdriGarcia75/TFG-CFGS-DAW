const { Task } = require('../models');

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      due_date,
      status,
      priority,
      userId,
      recurrence,
      boardId,
      columnId,
      display_order
    } = req.body;

    if (!title || !boardId || !columnId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: title, boardId o columnId.' });
    }

    const newTask = await Task.create({
      title,
      description,
      due_date,
      status,
      priority,
      userId,
      recurrence,
      boardId,
      columnId,
      display_order: display_order || 0
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTasksByBoard = async (req, res) => {
  try {
    const { boardId } = req.query;

    if (!boardId) {
      return res.status(400).json({ error: 'Se necesita la ID del tablero.' });
    }

    const tasks = await Task.findAll({
      where: { boardId },
      order: [['display_order', 'ASC']]
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas del tablero:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTasksByColumn = async (req, res) => {
  try {
    const { columnId } = req.query;

    if (!columnId) {
      return res.status(400).json({ error: 'Se necesita la ID de la columna.' });
    }

    const tasks = await Task.findAll({
      where: { columnId },
      order: [['display_order', 'ASC']]
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas de la columna:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    Object.assign(task, updates);
    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    await task.destroy();
    return res.status(200).json({ message: 'Tarea eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createTask,
  getTasksByBoard,
  getTasksByColumn,
  updateTask,
  deleteTask,
};
