const express = require('express');
const router = express.Router();
const agreementController = require('../controllers/agreementController.js');

router.post('/', async function(request, response) {
  return response.json(
    await agreementController.add(request)
  );
});

router.get('/:enrollment_id', async function(request, response) {
  return response.json(
    await agreementController.getById(request)
  );
});

router.post('/sign', async function(request, response) {
  return response.json(
    await agreementController.sign(request)
  );
});

module.exports = router;
