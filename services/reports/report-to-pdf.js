const Mustache = require('mustache');
let wkhtmltopdf = require('wkhtmltopdf');

let reportToPdf = async function (card, fileContent, key_report) {
  let rawDara = new Date(Date.parse(card.birth_date));

  let nameArray = card.name.split(' ');
  let firstName = nameArray[0];
  let lastName = nameArray[1];

  let view = {
    firstName: firstName,
    lastName: lastName,
    height: card.height,
    weight: card.weight,
    bmi: 1200,
    systolic: 1200,
    diastolic: 800,
    path_to_bg: __dirname +  '/../../storage/0001.jpg',
    month_birthday: rawDara.getMonth()+1,
    day_birthday: rawDara.getDate(),
    year_birthday: rawDara.getFullYear(),
  };

  let output = await Mustache.render(fileContent, view);

  await wkhtmltopdf(output, { output: `storage/${key_report}.pdf` });

  return {
    name: await card.name,
    nameReport: await key_report,
    fullYear: await rawDara.getFullYear,
  };
};

module.exports = reportToPdf;
