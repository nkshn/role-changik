const { QueryTypes } = require('sequelize');
const { sequelize, User } = require('../db/models');

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

async function findAllSubordinates(id) {
  try {
    return await sequelize.query(
      `WITH RECURSIVE cte AS (
        SELECT id, b_id, name, role, email, \"createdAt\", \"updatedAt\"
        FROM \"Users\"
        WHERE b_id = :b_id
        
        UNION
        
        SELECT \"Users\".id, \"Users\".b_id, \"Users\".name, \"Users\".role, \"Users\".email, \"Users\".\"createdAt\", \"Users\".\"updatedAt\"
        FROM \"Users\"
        JOIN cte ON cte.id = \"Users\".b_id
      )
      SELECT id, name, email, role, b_id, \"createdAt\", \"updatedAt\" FROM cte`,
      {
        type: QueryTypes.SELECT,
        replacements: { b_id: id },
        raw: true,
      },
    );
  } catch (err) {
    throw err;
  }
}

async function findBossAndAllSubordinates(id) {
  try {
    return await sequelize.query(
      `WITH RECURSIVE cte AS (
        SELECT id, b_id, name, role, email, \"createdAt\", \"updatedAt\"
        FROM \"Users\"
        WHERE id = :b_id OR b_id = :b_id
        
        UNION
        
        SELECT \"Users\".id, \"Users\".b_id, \"Users\".name, \"Users\".role, \"Users\".email, \"Users\".\"createdAt\", \"Users\".\"updatedAt\"
        FROM \"Users\"
        JOIN cte ON cte.id = \"Users\".b_id
      )
      SELECT id, name, email, role, b_id, \"createdAt\", \"updatedAt\" FROM cte`,
      {
        type: QueryTypes.SELECT,
        replacements: { b_id: id },
        raw: true,
      },
    );
  } catch (err) {
    throw err;
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

// TODO: complete this method
async function updateOne(id, b_id) {}

module.exports = {
  findOneById,
  findAllUsers,
  findAllSubordinates,
  findBossAndAllSubordinates,
  findOneByEmail,
  createOne,
};
