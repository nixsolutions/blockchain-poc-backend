const express = require('express');
const router = express.Router();
const models  = require('../models');

router.get('/zeroing', function(request, response) {
  return response.json(
    models.Reports.destroy({
      where: {},
      truncate: true
    }),

    models.Report_requests.destroy({
      where: {},
      truncate: true
    }),

    models.Requests.destroy({
      where: {},
      truncate: true
    }),
  );
});

module.exports = router;
