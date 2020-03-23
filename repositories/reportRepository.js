const models  = require('../models');
const cardRepository = require('./cardRepository');

let create = async function (request) {
  return await models.Reports.create({
    cardId: request.body.card_id,
    doctorId: request.body.doctor_id,
    kindergartenId: request.body.kindergarten_id,
    parentId: request.body.parent_id,
  }).then(function(response) {
    return response.dataValues;
  });
};

let writeToDb = async function (request) {
  let cardInfo = await cardRepository.getByCardName(request.body.card_id);

  return await models.Reports.create(
    {
      card_id: cardInfo.id,
      name   : request.body.key_report
    }
  );
};

let getById = async function (reportId, response) {
  let responseInfo = await models.Reports.findOne(
    {where: {id: reportId}}
  );

  return response.json({file_name: `${responseInfo.name}.pdf`});
};

let getByParams = async function (request) {
  return await models.Reports.findOne(
    {where: request}
  );
};

module.exports = {
  create,
  writeToDb,
  getById,
  getByParams,
};
