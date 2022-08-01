const { User } = require('../db/models');

async function findOneById(id) {
  try {
    const user = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (e) {
    throw e;
  }
}

async function findAllUsers() {
  try {
    const users = await User.findAll({
      raw: true,
      attributes: { exclude: ['password'] },
    });

    if (!users) {
      return null;
    }

    return users;
  } catch (e) {
    throw e;
  }
}

async function findOneByEmail(email) {
  try {
    const user = await User.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (e) {
    throw e;
  }
}

async function createOne(name, email, hashedPassword) {
  try {
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    })
      .then((data) => {
        return data.toJSON();
      })
      .catch((err) => {
        throw err;
      });

    return user;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  findOneById,
  findAllUsers,
  findOneByEmail,
  createOne,
};
