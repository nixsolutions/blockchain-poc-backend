const models  = require('../models');
const userRepository  = require('../repositories/userRepository');

let create = async function (request) {
  let userInfo = await userRepository.getByEnrollmentId(request.body.enrollment_id);

  return models.Cards.create({
    cardId: request.body.id,
    parentId: userInfo.id,
  }).then(function(response) {
    return response.dataValues;
  });
};

let getAllByUser = async function (request) {
  let userInfo = await userRepository.getByEnrollmentId(request.params.enrollment_id);

  return models.Cards.findAll(
  { where: {parentId: userInfo.id} }
  );
};

let getByCardName = async function (cardId) {
  return models.Cards.findOne(
    { where: {cardId: cardId} }
  );
};

let getByCardId = async function (id) {
  return models.Cards.findOne(
    { where: {id: id} }
  );
};

module.exports = {
  create,
  getAllByUser,
  getByCardName,
  getByCardId,
};
