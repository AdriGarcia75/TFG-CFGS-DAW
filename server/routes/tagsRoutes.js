const express = require('express');
const router = express.Router();

const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
  addTagToTask,
  removeTagFromTask,
} = require('../controllers/crudTags');

router.post('/', createTag);
router.get('/', getAllTags);
router.get('/:tagId', getTagById);
router.patch('/:tagId', updateTag);
router.delete('/:tagId', deleteTag);

router.post('/:taskId/tags', addTagToTask);
router.delete('/:taskId/tags/:tagId', removeTagFromTask);

module.exports = router;