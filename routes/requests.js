const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController.js');

router.post('/', async function(request, response) {
  return response.json(
    await requestController.add(request)
  );
});

router.get('/by-parents-id/:enrollment_id', async function(request, response) {
  return response.json(
    await requestController.getByParentId(
      request.params.enrollment_id
    )
  );
});

router.get('/by-kindergarten-id/:enrollment_id', async function(request, response) {
  return response.json(
    await requestController.getByKindergartenId(
      request.params.enrollment_id
    )
  );
});

router.get('/by-card-id/:card_id', async function(request, response) {
  return response.json(
    await requestController.getByCardId(
      request.params.card_id
    )
  );
});

router.put('/:report_id', async function(request, response) {
  return response.json(
    await requestController.update(request)
  );
});

module.exports = router;
