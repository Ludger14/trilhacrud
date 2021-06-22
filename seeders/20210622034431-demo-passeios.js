'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('Passeios', [{
      title: 'Praia do Perigoso',
      imagem: '../assets/img/praiaperigoso.jpeg',
      encontro: 'Barra de Guaratiba',
      tempo: '30-40 minutos',
      dia: 'Domingo - 10h',
      guia: 'Felipe',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Pedra do Telégrafo',
      imagem: '../assets/img/praiaperigoso.jpeg',
      encontro: 'Barra de Guaratiba',
      tempo: '30-40 minutos',
      dia: 'Domingo - 10h',
      guia: 'Ernesto',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Morro da Urca',
      imagem: '../assets/img/praiaperigoso.jpeg',
      encontro: 'Barra de Guaratiba',
      tempo: '30-40 minutos',
      dia: 'Domingo - 10h',
      guia: 'Felipe',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
