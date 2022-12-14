'use strict';

const bcrypt = require('bcryptjs');
const { UserRoles } = require('../../constants/user-roles.constant');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@rolechangikapp.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.ADMIN,
        b_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Vova',
        email: 'example1@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.BOSS,
        b_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Mykhailo',
        email: 'example2@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.BOSS,
        b_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Markus',
        email: 'example3@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.USER,
        b_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'George',
        email: 'example4@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.BOSS,
        b_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: 'Natalia',
        email: 'example5@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.USER,
        b_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: 'Antonio',
        email: 'example6@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.USER,
        b_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: 'Lewis',
        email: 'example7@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.USER,
        b_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: 'Max',
        email: 'example8@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.BOSS,
        b_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: 'Katrine',
        email: 'example9@gmail.com',
        password: bcrypt.hashSync(
          process.env.SEED_USER_TEST_PASSWORD,
          bcrypt.genSaltSync(),
        ),
        role: UserRoles.USER,
        b_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
