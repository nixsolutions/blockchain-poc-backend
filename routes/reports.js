const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');

router.post('/', async function(request, response) {
  return response.json(
    await reportController.add(request)
  );
});

router.post('/build', async function(request, response) {
  return response.json(
    await reportController.buildReport(request, response)
  );
});

router.get('/download/:id', async function(request, response) {
  return await reportController.getById(Number(request.params.id), response);
});

router.get('/:enrollment_id', async function(request, response) {
  return response.json(
    await reportController.getReports(request)
  );
});

router.post('/approve', async function(request, response) {
  return response.json(
    await reportController.approveReport(request)
  );
});

module.exports = router;
