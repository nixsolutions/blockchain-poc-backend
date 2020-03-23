let request = require('request');
let constants = require('../constants');

let myJSONObject = [
  {
    "id":"card_mary_robson_1",
    "type":"card",
    "enrollment_id": "user-parents-1",
    "name":"Mary Robson",
    "birth_date":
      "2017-05-24",
    "height":197,
    "weight":85,
    "vaccination":[
      {"name":"measles",
        "timestamp":1572598072}
    ],
    "parent":"user-parents-1"
  },
  {
    "id":"card_nick_robson_1",
    "type":"card",
    "enrollment_id": "user-parents-1",
    "name":"Nick Robson",
    "birth_date":
      "2017-05-24",
    "height":197,
    "weight":85,
    "vaccination":[
      {"name":"measles",
        "timestamp":1572598072}
    ],
    "parent":"user-parents-1"
  }
];

for (let i = 0; i < myJSONObject.length; i++) {
  request({
    url: constants.hostName+":3006/cards",
    method: "POST",
    json: true,
    body: myJSONObject[i]
  }, function (error, response, body){
    console.log(response);
  });
}
