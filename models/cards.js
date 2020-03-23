'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define('Cards', {
    cardId: DataTypes.STRING,
    parentId: DataTypes.INTEGER
  }, {});
  Cards.associate = function(models) {
    // associations can be defined here
  };
  return Cards;
};
