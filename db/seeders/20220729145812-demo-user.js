'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Vova',
        email: 'example@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
