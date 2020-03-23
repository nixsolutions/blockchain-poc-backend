const reportCreate = require('../services/reports/add-report');
const allReports = require('../services/reports/all-report');
const reportToPdf = require('../services/reports/report-to-pdf');
const approve = require('../services/reports/approve-report');
const getCard = require('../services/cards/get-card');
const userRepository = require('../repositories/userRepository.js');
const cardRepository = require('../repositories/cardRepository.js');
const reportRepository = require('../repositories/reportRepository.js');
const reportRequestRepository = require('../repositories/reportRequestRepository.js');
const organisationRepository = require('../repositories/organisationRepository.js');

let fs = require('fs');

const add = async function(request){
  let userInfo = await userRepository.getByEnrollmentId(request.body.enrollment_id);
  let organisation = await organisationRepository.getById(userInfo.organisationId);

  let cardInfo = await getCard(
    request.body.enrollment_id,
    request.body.card_id,
    organisation.name
  );

  let card = await JSON.parse(cardInfo.text);

  return reportCreate(
    request.body.key,
    card.id,
    card.parent,
    request.body.enrollment_id,
    request.body.enrollment_id,
    card.birth_date,
    card.height,
    card.weight,
    card.vaccination,
  );
};

const getReports = async function(request){
  let userInfo = await userRepository.getByEnrollmentId(request.params.enrollment_id);
  let organisation = await organisationRepository.getById(userInfo.organisationId);

  return allReports(
    request.params.enrollment_id,
    organisation.name
  );
};

const approveReport = function(request){
  return approve(
    request.body.key,
    request.body.enrollment_id
  );
};

const buildReport = async function(request, response){
  let userInfo = await userRepository.getByEnrollmentId(request.body.enrollment_id);
  let organisation = await organisationRepository.getById(userInfo.organisationId);

  let cardInfo = await getCard(
    request.body.enrollment_id,
    request.body.card_id,
    organisation.name
  );

  let card = await JSON.parse(cardInfo.text);
  let fileContent = await fs.readFileSync(__dirname + '/../storage/print-pdf.html', "utf8");
  let reportInfo = await reportToPdf(card, fileContent, request.body.key_report);
  let reportInSql = await reportRepository.writeToDb(request);
  let cardInfoFromDB = await cardRepository.getByCardName(request.body.card_id);

  reportRequestRepository.addReportId(reportInSql.id, cardInfoFromDB.id);

  return {...reportInfo, reportId: reportInSql.id};
};

const getById = async function(reportId, response){
  return await reportRepository.getById(reportId, response)
};

module.exports = {
  add,
  getReports,
  approveReport,
  buildReport,
  getById,
};
