const registerUser = require('../services/users/registerUser.js');
const authUser = require('../services/users/auth.js');
const userRepository  = require('../repositories/userRepository');

const register = function(request, response){
  userRepository.create(request);

  return registerUser(
      request.body.enrollment_id,
      request.body.first_name,
      request.body.last_name,
      request.body.role,
      request.body.organisation,
      request.body.mspId
  );
};

const login = function(request, response){
  return authUser.login(request, response)
};

module.exports = {
  register,
  login
};
