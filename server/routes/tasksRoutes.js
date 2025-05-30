const express = require('express');
const router = express.Router();

const taskAttachments = require('../middlewares/taskAttachments'); // middleware to control the crud of attachments

const {
  createTask,
  getTasksByBoard,
  getTasksByColumn,
  getSelectorOptions,
  updateTask,
  deleteTask,
  uploadAttachment,
  getAttachmentsByTask,
  deleteAttachment,
} = require('../controllers/crudTasks');

router.post('/', createTask);
router.get('/', getTasksByColumn);
router.delete('/', deleteTask);
router.get('/by-board', getTasksByBoard);
router.get('/selectorOptions', getSelectorOptions);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);
router.get('/:taskId/attachments', getAttachmentsByTask);
router.delete('/attachments/:attachmentId', deleteAttachment);


// these routes use the taskAttachments middleware
router.post('/:taskId/attachments', taskAttachments.single('attachment'), uploadAttachment);


module.exports = router;
