const jwt = require('jsonwebtoken');
const constants = require('../constants');

let isAuth = function (request, response, next) {
  let token = request.headers['authorization'];
  token = token.slice(7, token.length);

  if (token) {
    jwt.verify(token, constants.jwt_secret, (err, decoded) => {
      if (err) {
        return response.status(401).json({ error: 'Token is not valid!' });
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    return response.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = isAuth;
