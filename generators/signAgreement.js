let request = require('request');
let constants = require('../constants');

/**
 * APPROVE AGREEMENT
 * @type {{agreement_key: string, enrollment_id: string}[]}
 */

let approveAgreements = {
  "agreement_key": "agreement_key_1",
  "enrollment_id": "user-hospital-1"
};

request({
  url: constants.hostName+":3006/agreements/sign",
  method: "POST",
  json: true,
  body: approveAgreements
}, function (error, response, body){
  console.log(response);
});
