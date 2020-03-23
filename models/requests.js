'use strict';
module.exports = (sequelize, DataTypes) => {
  const Requests = sequelize.define('Requests', {
    status: DataTypes.STRING,
    cardId: DataTypes.INTEGER,
    kindergartenId: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER
  }, {});
  Requests.associate = function(models) {
    // associations can be defined here
  };
  return Requests;
};
