const addCard = require('../services/cards/add-card.js');
const getCard = require('../services/cards/get-card.js');
const getAllCards = require('../services/cards/get-all-cards.js');
const updateCard = require('../services/cards/update-card.js');
const cardRepository  = require('../repositories/cardRepository');
const userRepository = require('../repositories/userRepository.js');
const organisationRepository = require('../repositories/organisationRepository.js');

const add = function(request){
  cardRepository.create(request);

  return addCard(
    request.body.enrollment_id,
    request.body.id,
    request.body.name,
    request.body.birth_date,
    request.body.height,
    request.body.weight,
    request.body.parent,
    Date.now()
  );
};

const getById = async function(request){
  let userInfo = await userRepository.getByEnrollmentId(request.params.enrollment_id);
  let organisation = await organisationRepository.getById(userInfo.organisationId);

  return await getCard(
    request.params.enrollment_id,
    request.params.card_id,
    organisation.name
  );
};

const getAll = function(request){
  return getAllCards(
    request.params.enrollment_id
  );
};

const update = function(request){
  return updateCard(
    request.body.card_id,
    request.body.enrollment_id,
    request.body.height,
    request.body.weight,
  );
};

const getAllByParent = function(request){
  return cardRepository.getAllByUser(request);
};

module.exports = {
  add,
  getById,
  getAll,
  update,
  getAllByParent,
};
