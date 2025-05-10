const express = require('express');
const router = express.Router();
const {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard
} = require('../controllers/crudBoards');

router.get('/', getBoards);

router.post('/', createBoard);

router.put('/:boardId', updateBoard);

router.delete('/:boardId', deleteBoard);

module.exports = router;
