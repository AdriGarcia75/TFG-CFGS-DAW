const { Column, Task } = require('../models');

const createColumn = async (req, res) => {
  try {
    const { boardId, name, description, color } = req.body;

    if (!boardId || !name) {
      return res.status(400).json({ error: 'Se necesita la ID del tablero y un nombre.' });
    }

    // search the biggest/last display_order to place it +1
    const maxOrderColumn = await Column.findOne({
      where: { boardId },
      order: [['display_order', 'DESC']],
    });
    const nextOrder = maxOrderColumn ? maxOrderColumn.display_order + 1 : 0;

    const newColumn = await Column.create({
      boardId,
      name,
      description,
      display_order: nextOrder,
      color: color || 'bg-gray-100',
    });

    return res.status(201).json(newColumn);
  } catch (error) {
    console.error('Error al crear la columna', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getColumns = async (req, res) => {
  try {
    const { boardId } = req.query;
    if (!boardId) {
      return res.status(400).json({ error: 'Se necesita la ID del tablero.' });
    }

    const columns = await Column.findAll({ where: { boardId }, order: [['display_order', 'ASC']] });
    return res.status(200).json(columns);
  } catch (error) {
    console.error('Error al obtener las columnas', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateColumn = async (req, res) => {
  try {
    const { columnId } = req.params;
    const { name, description, display_order, color } = req.body;

    const column = await Column.findByPk(columnId);
    if (!column) {
      return res.status(404).json({ error: 'Columna no encontrada.' });
    }

    const oldName = column.name;

    if (name !== undefined) column.name = name;
    if (description !== undefined) column.description = description;
    if (display_order !== undefined) column.display_order = display_order;
    if (color !== undefined) column.color = color;

    await column.save();

    // update task status after changing column name
    if (name && oldName !== name) {
      await Task.update(
        { status: name },
        { where: { status: oldName } }
      );
    }

    return res.status(200).json(column);
  } catch (error) {
    console.error('Error al actualizar la columna', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const { columnId } = req.params;

    const column = await Column.findByPk(columnId);
    if (!column) {
      return res.status(404).json({ error: 'Columna no encontrada.' });
    }

    await column.destroy();
    return res.status(200).json({ message: 'Columna eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la columna', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createColumn,
  getColumns,
  updateColumn,
  deleteColumn,
};
