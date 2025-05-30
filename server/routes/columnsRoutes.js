const express = require('express');
const router = express.Router();
const {
  createColumn,
  getColumns,
  updateColumn,
  deleteColumn
} = require('../controllers/crudColumns');

router.get('/', getColumns);
router.post('/', createColumn);
router.patch('/:columnId', updateColumn);
router.delete('/:columnId', deleteColumn);

module.exports = router;
