const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByBoard,
  getTasksByColumn,
  updateTask,
  deleteTask
} = require('../controllers/crudTasks');

router.post('/', createTask);
router.get('/by-board', getTasksByBoard);
router.get('/by-column', getTasksByColumn);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
