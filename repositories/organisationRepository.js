const models  = require('../models');

let getByName = async function (organisationName) {
  try {
    let result = await models.Organisations.findOne(
      { where: {name: organisationName} }
    );

    return result.dataValues;
  } catch (error) {
    return {'error':`error`};
  }
};

let getById = async function (organisationId) {
  try {
    let result = await models.Organisations.findOne(
      { where: {id: organisationId} }
    );

    return result.dataValues;
  } catch (error) {
    return {'error':`error`};
  }
};


module.exports = {
  getByName,
  getById,
};
