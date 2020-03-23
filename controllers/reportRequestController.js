const reportRequestRepository = require('../repositories/reportRequestRepository');
const userRepository = require('../repositories/userRepository.js');
const organisationRepository = require('../repositories/organisationRepository.js');
const cardRepository = require('../repositories/cardRepository.js');

const add = function(request){
  return reportRequestRepository.create(request);
};

const getByKindergartenId = async function(request){
  let userInfo = await userRepository.getByEnrollmentId(request.params.enrollment_id);
  let organisation = await organisationRepository.getById(userInfo.organisationId);

  return await reportRequestRepository.getByKindergartenId(organisation.id);
};

const getByDoctorId = async function(request){
  let userInfo = await userRepository.getByEnrollmentId(request.params.enrollment_id);
  let organisation = await organisationRepository.getById(userInfo.organisationId);

  return reportRequestRepository.getByDoctorId(organisation.id);
};

const getCreatedReports = async function(request){
  let cards = await cardRepository.getAllByUser(request);

  return await reportRequestRepository.getReportsByCardsArray(cards);
};

const confirm = async function(reportId){
  await reportRequestRepository.confirmReportRequests(reportId);

  return reportRequestRepository.getById(reportId);
};

module.exports = {
  add,
  getByKindergartenId,
  getByDoctorId,
  getCreatedReports,
  confirm
};
