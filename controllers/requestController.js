const requests = require('../repositories/requestRepository');
const userRepository = require('../repositories/userRepository.js');
const requestsRepository = require('../repositories/requestRepository.js');

const add = async function(request){
  let userInfo = await userRepository.getByEnrollmentId(request.body.enrollment_id);

  return requests.create(request, userInfo.id);
};

const getByParentId = async function(parentId){
  let userInfo = await userRepository.getByEnrollmentId(parentId);

  return requests.getByParentId(userInfo.id);
};

const getByKindergartenId = async function(kindergartenId){
  let userInfo = await userRepository.getByEnrollmentId(kindergartenId);

  return requests.getByKindergartenId(userInfo.id);
};

const getByCardId = async function(cardId){
  return await requestsRepository.getByCardId(cardId);
};

const update = function(request){
  return requestsRepository.updateRequest(
    request.params.report_id,
    request.body.status,
    Date.now()
  );
};

module.exports = {
  add,
  getByParentId,
  getByKindergartenId,
  update,
  getByCardId,
};
