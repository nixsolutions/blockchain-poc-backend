const express = require('express');
const router = express.Router();
const reportRequestController = require('../controllers/reportRequestController.js');

router.post('/', async function(request, response) {
  return response.json(
    await reportRequestController.add(request)
  );
});

router.post('/confirmed', async function(request, response) {
  return response.json(
    await reportRequestController.confirm(request.body.reportId)
  );
});

router.get('/by-kindergarten-id/:enrollment_id', async function(request, response) {
  return response.json(
    await reportRequestController.getByKindergartenId(request)
  );
});

router.get('/by-doctor-id/:enrollment_id', async function(request, response) {
  return response.json(
    await reportRequestController.getByDoctorId(request)
  );
});

router.get('/by-parents-id/:enrollment_id', async function(request, response) {
  return response.json(
    await reportRequestController.getCreatedReports(request)
  );
});

module.exports = router;
