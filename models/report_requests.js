'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report_requests = sequelize.define('Report_requests', {
    status: DataTypes.STRING,
    cardId: DataTypes.INTEGER,
    kindergartenId: DataTypes.INTEGER,
    reportId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER
  }, {});
  Report_requests.associate = function(models) {
    // associations can be defined here
  };
  return Report_requests;
};
