const express = require('express');
const {
  getAll,
  getById,
  add,
  update,
  remove,
  changeStatus,
} = require('../controllers/todo');
const router = express.Router();

/* GET todo listing. */
router.get('/', async (_, res) => {
  getAll(res);
});

/* GET by id. */
router.get('/:id', async (req, res) => {
  getById(req, res);
});

/* CREATE item. */
router.post('/', (req, res) => {
  add(req, res);
});

/* UPDATE item. */
router.put('/:id', (req, res) => {
  update(req, res);
});

/* DELETE item. */
router.delete('/:id', (req, res) => {
  remove(req, res);
});

/* CHANGE STATUS item. */
router.patch('/:id', (req, res) => {
  changeStatus(req, res);
});

module.exports = router;
