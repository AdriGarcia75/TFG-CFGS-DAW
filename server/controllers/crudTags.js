const { Tag, Task } = require('../models');

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Falta el campo obligatorio: name.' });
    }

    const color = generateRandomColor();

    const newTag = await Tag.create({ name, color });

    return res.status(201).json(newTag);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      order: [['name', 'ASC']]
    });

    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTagById = async (req, res) => {
  try {
    const { tagId } = req.params;

    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: 'Tag no encontrado.' });
    }

    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { name } = req.body;

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ error: 'Tag no encontrado.' });
    }

    if (name) tag.name = name;

    await tag.save();

    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTag = async (req, res) => {
  try {
    const { tagId } = req.params;

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ error: 'Tag no encontrado.' });
    }

    await tag.destroy();

    return res.status(200).json({ message: 'Tag eliminado correctamente.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const addTagToTask = async (req, res) => {
  const { taskId } = req.params;
  const { tagId } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    const tag = await Tag.findByPk(tagId);

    if (!task || !tag) {
      return res.status(404).json({ error: 'Tarea o Tag no encontrado.' });
    }

    await task.addTags(tag);

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
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const removeTagFromTask = async (req, res) => {
  const { taskId, tagId } = req.params;

  try {
    const task = await Task.findByPk(taskId);
    const tag = await Tag.findByPk(tagId);

    if (!task || !tag) {
      return res.status(404).json({ error: 'Tarea o Tag no encontrado.' });
    }

    await task.removeTag(tag);

    return res.status(200).json({ message: 'Tag removido de la tarea.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
  addTagToTask,
  removeTagFromTask,
};
