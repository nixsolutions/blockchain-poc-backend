const models  = require('../models');
const constant = require('../constants');
const cardRepository = require('./cardRepository');
const sequelize = require('sequelize');

let create = async function (request) {
  let cardInfo = await cardRepository.getByCardName(request.body.card_id);

  return await models.Report_requests.create({
    status: constant.statusReportRequest_requested,
    cardId: cardInfo.id,
    doctorId: request.body.doctor_id,
    kindergartenId: request.body.kindergarten_id,
    parentId: request.body.parent_id,
  }).then(function(response) {
    return response.dataValues;
  });
};

let getByKindergartenId = async function (kindergartenId) {
  return await models.Report_requests.findAll(
    {where: {
      kindergartenId: kindergartenId,
      status: 'confirmed',
    }}
  )
};

let getByDoctorId = async function (doctorId) {
  let requests = await models.Report_requests.findAll(
    {where: {doctorId: doctorId}}
  );

  for (let i = 0; i < requests.length; i++) {
    let cardInfo = await cardRepository.getByCardId(
      Number(requests[i].cardId)
    );

    requests[i].cardId = cardInfo.cardId;
  }

  return requests;
};

let addReportId = async function (reportId, cardId) {
  return await models.Report_requests.update(
    { reportId: reportId, status: constant.statusReportRequest_created },
    { where: { cardId: cardId }}
  );
};

let getReportsByCardsArray = async function (cards) {
  let requests = [];

  for (let i = 0; i < cards.length; i++) {
    let res = await models.Report_requests.findOne(
      {
        where: {
          cardId: cards[i].id,
        }
      }
    );

    if (res && res.reportId) {
      requests.push(res);
    }
  }

  for (let i = 0; i < requests.length; i++) {
    let cardInfo = await cardRepository.getByCardId(
      Number(requests[i].cardId)
    );

    requests[i].cardId = cardInfo.cardId;
  }

  return requests;
};

let confirmReportRequests = async function (reportId) {
  return await models.Report_requests.update(
    { status: constant.statusReportRequest_confirmed },
    { where: { reportId: reportId }}
  );
};

let getById = async function (id) {
  return await models.Reports.findOne(
  {
    where: {
      id: id
    }
  });
};

let getConfirmedByCardId = async function (cardId) {
  return await models.Report_requests.findOne(
    {where: {cardId: cardId, status: constant.statusReportRequest_confirmed}}
  )
};

let getByParams = async function (params) {
  return await models.Report_requests.findOne(
    {where: params}
  )
};

module.exports = {
  create,
  getByKindergartenId,
  getByDoctorId,
  addReportId,
  getReportsByCardsArray,
  confirmReportRequests,
  getById,
  getConfirmedByCardId,
  getByParams
};
