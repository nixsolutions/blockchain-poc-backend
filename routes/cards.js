const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController.js');

router.post('/', async function(request, response) {
  return response.json(
    await cardController.add(request)
  );
});

router.get('/get-all-by-parent/:enrollment_id', async function(request, response) {
  return response.json(
    await cardController.getAllByParent(request)
  );
});

router.get('/:card_id/:enrollment_id', async function(request, response) {
  return response.json(
    await cardController.getById(request)
  );
});

router.get('/:enrollment_id', async function(request, response) {
  return response.json(
    await cardController.getAll(request)
  );
});

router.put('/:card_id', async function(request, response) {
  return response.json(
    await cardController.update(request)
  );
});

module.exports = router;
