let request = require('request');

/**
 * APPROVE AGREEMENT
 * @type {{agreement_key: string, enrollment_id: string}[]}
 */

let approveAgreements = {
  "agreement_key": "agreement_key_1",
  "enrollment_id": "user-hospital-1"
};

request({
  url: "http://api.blockchain.js.nixdev.co:3000/agreements/sign",
  method: "POST",
  json: true,
  body: approveAgreements
}, function (error, response, body){
  console.log(response);
});
