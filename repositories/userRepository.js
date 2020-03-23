const models  = require('../models');
const organisationRepository  = require('../repositories/organisationRepository');

let create = async function (request) {
  let dataOrganisation = await organisationRepository.getByName(request.body.organisation);

  return models.Users.create({
    enrollmentId: request.body.enrollment_id,
    firstName: request.body.first_name,
    lastName: request.body.last_name,
    role: request.body.role,
    organisationId: dataOrganisation.id,
    login: request.body.organisation,
    password: 'password'
  }).then(function(response) {
    return response.dataValues;
  });
};

let getByEnrollmentId = async function (enrollmentId) {
  try {
    let result = await models.Users.findOne(
      { where: {enrollmentId: enrollmentId} }
    );

    return result.dataValues;
  } catch (error) {
    return {'error':error};
  }
};

let getByLoginPassword = async function (userInfo) {
  try {
    let result = await models.Users.findOne(
      { where: {login: userInfo.login, password: userInfo.password} }
    );

    return result.dataValues;
  } catch (error) {
    return {'error':'not valid user id or password'};
  }
};

module.exports = {
  create,
  getByEnrollmentId,
  getByLoginPassword,
};
