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
     await queryInterface.bulkInsert('Usuarios', [{
      nome: 'Ludger',
      email: 'ludger@gmail.com',
      telefone: '2198765-4321',
      passeio: 'Pedra do Telégrafo',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Grevisse',
      email: 'grevisse@gmail.com',
      telefone: '1198765-4321',
      passeio: 'Praia do Perigoso',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Thiago',
      email: 'thiago@gmail.com',
      telefone: '3198765-4321',
      passeio: 'Pedra Bonita',
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
