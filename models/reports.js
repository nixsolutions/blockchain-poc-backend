'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reports = sequelize.define('Reports', {
    card_id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Reports.associate = function(models) {
    // associations can be defined here
  };
  return Reports;
};