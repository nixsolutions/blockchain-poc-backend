const models  = require('../models');
const constant = require('../constants');
const cardRepository = require('./cardRepository');
const reportRequestRepository = require('./reportRequestRepository');
const reportRepository = require('./reportRepository');

let create = async function (request, userId) {
  let cardInfo = await cardRepository.getByCardName(request.body.card_id);

  return await models.Requests.create({
    status: constant.statusRequest_created,
    cardId: cardInfo.id,
    kindergartenId: request.body.kindergarten_id,
    parentId: userId,
    doctorId: request.body.doctor_id
  }).then(function(response) {
    return response.dataValues;
  });
};

let getByParentId = async function (parentId) {
  let requests = await models.Requests.findAll(
    {where: {parentId: parentId}}
  );

  for (let i = 0; i < requests.length; i++) {
    let cardInfo = await cardRepository.getByCardId(
      Number(requests[i].cardId)
    );

    requests[i].cardId = cardInfo.cardId;
  }

  return requests;
};

let getByKindergartenId = async function (kindergartenId, response) {
  let requests = await models.Requests.findAll(
    {where: {kindergartenId: kindergartenId}}
  );

  let resultArray = [];

  for (let i = 0; i < requests.length; i++) {
    let cardInfo = await cardRepository.getByCardId(
      Number(requests[i].cardId)
    );

    resultArray[i] = {
      id: requests[i].id,
      status: requests[i].status,
      cardId: cardInfo.cardId,
      kindergartenId: requests[i].kindergartenId,
      parentId: requests[i].parentId,
      doctorId: requests[i].doctorId,
      createdAt: requests[i].createdAt,
      updatedAt: requests[i].updatedAt,
    };

    let confirmedCard = await reportRequestRepository.getConfirmedByCardId(requests[i].cardId);

    if(confirmedCard) {
      let report = await reportRepository.getByParams({id: confirmedCard.reportId});

      resultArray[i].reportId = confirmedCard.reportId;
      resultArray[i].reportName = report.name;
    }

    let reportRequest = await reportRequestRepository.getByParams({cardId: cardInfo.id});

    if (reportRequest) {
      resultArray[i].reportStatus = reportRequest.status;
    }
  }

  return resultArray;
};

let updateRequest = async function (reportId, status, date) {
  return await models.Requests.update(
    { status: status },
    { where: { id: reportId }}
  );
};

let getByCardId = async function (cardName) {
  let cardInfo = await cardRepository.getByCardName(cardName);

  let card = await models.Requests.findOne(
    {where: {cardId: cardInfo.id}}
  );

  if (!card) {
    return null
  }

  card.cardId = cardName;

  return card;
};

module.exports = {
  create,
  getByParentId,
  getByKindergartenId,
  updateRequest,
  getByCardId,
};
