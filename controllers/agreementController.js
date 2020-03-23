const addAgreement = require('../services/agreements/add-agreement.js');
const getByIdAgreement = require('../services/agreements/get-by-id-agreement.js');
const signAgreement = require('../services/agreements/sign-agreement.js');
const userRepository  = require('../repositories/userRepository');
const organisationRepository  = require('../repositories/organisationRepository');

const add = function(request){
  return addAgreement(
    request.body.agreement_key,
    request.body.doctor,
    request.body.enrollment_id,
    request.body.organisation,
  );
};

const getById = async function(request){
  let userInfo = await userRepository.getByEnrollmentId(request.params.enrollment_id);
  let orgInfo = await organisationRepository.getById(userInfo.organisationId);

  return getByIdAgreement(
    request.params.enrollment_id,
    orgInfo.name
  );
};

const sign = async function(request){
  let userInfo = await userRepository.getByEnrollmentId(request.body.enrollment_id);
  let orgInfo = await organisationRepository.getById(userInfo.organisationId);

  return signAgreement(
    request.body.agreement_key,
    request.body.enrollment_id,
    orgInfo.name
  );
};

module.exports = {
  add,
  getById,
  sign
};
