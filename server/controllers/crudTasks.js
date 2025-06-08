const { Task, Column, Attachment, Tag } = require('../models');
const { Op } = require('sequelize');

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      due_date,
      status,
      priority,
      userId,
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
      boardId,
      columnId,
      display_order: display_order || 0
    });

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTasksByColumn = async (req, res) => {
  try {
    const { columnId, columnIds } = req.query;

    if (!columnId && !columnIds) {
      return res.status(400).json({ error: 'Se necesitan las IDs de las columnas' });
    }

    const includeAttachments = {
      model: Attachment,
      as: 'attachments',
      attributes: ['id', 'file_path', 'createdAt']
    };

    const includeTags = {
      model: Tag,
      as: 'Tags',
      attributes: ['id', 'name', 'color'],
      through: { attributes: [] }
    };

    let tasks;

    if (columnIds) {
      // convert the columns ids to a proper array
      const idsArray = columnIds.split(',').map(id => Number(id));
      tasks = await Task.findAll({
        where: { columnId: { [Op.in]: idsArray } },
        order: [['display_order', 'ASC']],
        include: [includeAttachments, includeTags]
      });
    } else {
      tasks = await Task.findAll({
        where: { columnId: columnId },
        order: [['display_order', 'ASC']],
        include: [includeAttachments, includeTags]
      });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getSelectorOptions = async (req, res) => {
  try {
    const boardId = req.query.boardId;

    if (!boardId) {
      return res.status(400).json({ error: 'Se requiere boardId' });
    }

    const columns = await Column.findAll({
      where: { boardId: boardId },
      attributes: ['id', 'name'],
    });

    const statusOptions = columns.map(col => ({ id: col.id, name: col.name }));
    const priorityEnum = Task.rawAttributes.priority.values;

    return res.status(200).json({
      status: statusOptions,
      priority: priorityEnum,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const task = await Task.findByPk(taskId, {
      include: [{ model: Tag, as: 'Tags' }]
    });

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    const allowedFields = ['title', 'description', 'due_date', 'status', 'priority', 'columnId', 'display_order'];
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        task[field] = updates[field];
      }
    });

    await task.save();

    if (Array.isArray(updates.tagIds)) {
      await task.setTags(updates.tagIds);
    }

    const updatedTask = await Task.findByPk(taskId, {
      include: [{
        model: Tag,
        as: 'Tags',
        attributes: ['id', 'name', 'color'],
        through: { attributes: [] }
      }]
    });

    return res.status(200).json(updatedTask);
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
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadAttachment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { taskId } = req.params;
    const filePath = `/uploads/attachments/${taskId}/${req.file.filename}`;

    // save filepath in db
    const newAttachment = await Attachment.create({
      file_path: filePath,
      taskId: taskId
    });

    return res.status(201).json({
      message: 'Archivo subido y registrado en BD',
      attachment: newAttachment
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAttachmentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const attachments = await Attachment.findAll({
      where: { taskId },
      attributes: ['id', 'file_path', 'createdAt'],
    });

    return res.status(200).json(attachments);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAttachment = async (req, res) => {
  try {
    const { attachmentId } = req.params;

    const attachment = await Attachment.findByPk(attachmentId);
    if (!attachment) {
      return res.status(404).json({ error: 'Archivo adjunto no encontrado.' });
    }

    await attachment.destroy();

    return res.status(200).json({ message: 'Archivo adjunto eliminado correctamente.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createTask,
  getTasksByColumn,
  getSelectorOptions,
  updateTask,
  deleteTask,
  uploadAttachment,
  getAttachmentsByTask,
  deleteAttachment,
};
