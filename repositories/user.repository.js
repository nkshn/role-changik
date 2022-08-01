const { User } = require('../db/models');

async function findOneByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return user.toJSON();
    } else {
      return null;
    }
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
  findOneByEmail,
  createOne,
};
