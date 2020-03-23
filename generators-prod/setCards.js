let request = require('request');

let myJSONObject = [
  {
    "id":"card_mary_robson_1",
    "type":"card",
    "enrollment_id": "user-parents-1",
    "name":"Mary Robson",
    "birth_date":
      "2012-09-25",
    "height":125,
    "weight":25,
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
      "2013-09-25",
    "height":126,
    "weight":28,
    "vaccination":[
      {"name":"measles",
        "timestamp":1572598072}
    ],
    "parent":"user-parents-1"
  }
];

for (let i = 0; i < myJSONObject.length; i++) {
  request({
    url: "http://api.blockchain.js.nixdev.co:3000/cards",
    method: "POST",
    json: true,
    body: myJSONObject[i]
  }, function (error, response, body){
    console.log(response);
  });
}
