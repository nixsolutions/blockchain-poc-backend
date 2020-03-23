const jwt = require('jsonwebtoken');
const constant = require('../../constants');
const userRepository = require('../../repositories/userRepository');
const organisationRepository = require('../../repositories/organisationRepository');

let login = async function (request, response) {
  const loginInfo = request.body;

  let getUser = await userRepository.getByLoginPassword(loginInfo);

  if (getUser.error) {
    return response.status(401).json({ error: 'not valid user id or password!' });
  }

  let organisation = await organisationRepository.getById(getUser.organisationId);


  const user = {
    id: getUser.id,
  };

  const token = jwt.sign(user, constant.jwt_secret, {
    expiresIn: 60 * 2
  });

  return {
    success: true,
    message: 'Authentication successful!',
    role: organisation.name,
    enrollmentId: getUser.enrollmentId,
    token
  };
};

module.exports = {
  login,
};
