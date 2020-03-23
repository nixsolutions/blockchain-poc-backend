const express = require('express');
const router = express.Router();
const enrollAdmin = require('../services/enrollAdmin.js');
const userController = require('../controllers/userController.js');

router.post('/admin-enroll', async function(request, response) {
  return response.json(
    await enrollAdmin(
      request.body.organisation,
      request.body.mspId
    )
  );
});

router.post('/', async function(request, response) {
  return response.json(
    await userController.register(request)
  );
});

router.post('/login', async function(request, response) {
  return response.json(
    await userController.login(request, response)
  );
});

module.exports = router;
