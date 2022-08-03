const { QueryTypes } = require('sequelize');
const { sequelize, User } = require('../db/models');
const { UserRoles } = require('../constants/user-roles.constant');

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

async function checkForAvaliableBosses(id) {
  try {
    return await sequelize.query(
      `WITH RECURSIVE cte AS (
        SELECT id, b_id, name, role, email, \"createdAt\", \"updatedAt\"
        FROM \"Users\"
        WHERE b_id = :b_id AND role LIKE :role
        
        UNION
        
        SELECT \"Users\".id, \"Users\".b_id, \"Users\".name, \"Users\".role, \"Users\".email, \"Users\".\"createdAt\", \"Users\".\"updatedAt\"
        FROM \"Users\"
        JOIN cte ON \"Users\".id = cte.b_id AND \"Users\".role LIKE :role AND \"Users\".b_id IS NOT null
      )
      SELECT id, name, email, role, b_id, \"createdAt\", \"updatedAt\" FROM cte`,
      {
        type: QueryTypes.SELECT,
        replacements: {
          b_id: id,
          role: UserRoles.BOSS,
        },
        raw: true,
      },
    );
  } catch (err) {
    throw err;
  }
}

async function changeUserBoss(chosenUserId, newBossId) {
  const t = await sequelize.transaction();

  try {
    const selecteUser = await User.findByPk(chosenUserId, {
      transaction: t,
    });

    /**
     * i did this for store prev user boss,
     * bacouse next i will be checking
     * if in prev boss, we have any more users,
     * bacause if not more users, we change role from BOSS to USER
     */
    const previousBossId = await User.findByPk(selecteUser.id, {
      attributes: ['b_id'],
      transaction: t,
    }).then((data) => {
      return data.b_id;
    });

    await selecteUser.update({ b_id: newBossId });

    const prevBossSubordinates = await User.findAll({
      where: {
        b_id: previousBossId,
      },
      transaction: t,
    });

    /**
     * why -1?
     * because we remove user for subordinates of this boos but not save it current,
     * so thats why we do -1;
     *
     * also, why <=1?
     * bacause if count of boss, subordinates if lower or is 1, we change his role
     * from ADMIN to USER
     * bacause, he didnt have yet subordinates users
     */
    const isPrevBossHavingSubordinates =
      prevBossSubordinates.length - 1 <= 1 ? false : true;
    if (!isPrevBossHavingSubordinates) {
      await User.update(
        { role: UserRoles.USER },
        {
          where: {
            id: previousBossId,
          },
          transaction: t,
        },
      );
    }

    await selecteUser.save();
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

module.exports = {
  findAllSubordinates,
  findBossAndAllSubordinates,
  checkForAvaliableBosses,
  changeUserBoss,
};
