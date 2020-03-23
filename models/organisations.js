'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organisations = sequelize.define('Organisations', {
    name: DataTypes.STRING
  }, {});
  Organisations.associate = function(models) {
    // associations can be defined here
  };
  return Organisations;
};
