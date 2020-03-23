let request = require('request');
let constants = require('../constants');

/**
 * ADD AGREEMENT
 * @type {{agreement_key: string, doctor: string, enrollment_id: string, organisation: string}[]}
 */
let addAgreements = {
  "agreement_key": "agreement_key_1",
  "doctor": "user-hospital-1",
  "enrollment_id": "user-parents-1",
  "organisation":"parents"
};

request({
  url: constants.hostName+":3006/agreements",
  method: "POST",
  json: true,
  body: addAgreements
}, function (error, response, body){
  console.log(response);
});
