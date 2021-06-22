'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Passeio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Passeio.init({
    title: DataTypes.STRING,
    imagem: DataTypes.STRING,
    encontro: DataTypes.STRING,
    tempo: DataTypes.STRING,
    dia: DataTypes.STRING,
    guia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Passeio',
  });
  return Passeio;
};