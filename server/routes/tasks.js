const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByBoard,
  getTasksByColumn,
  getSelectorOptions,
  updateTask,
  deleteTask
} = require('../controllers/crudTasks');

router.post('/', createTask);
router.get('/', getTasksByColumn);
router.get('/by-board', getTasksByBoard);
router.get('/selectorOptions', getSelectorOptions)
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
