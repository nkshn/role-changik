require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { sequelize } = require('./db/models/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

(async function () {
  try {
    // connectiing to postgres db
    await sequelize
      .authenticate()
      .then(() => {
        console.log(
          `Connection to DataBase \"${process.env.DATABASE_NAME}\" has been established successfully!`,
        );
      })
      .catch((err) => {
        console.error('Unable to connect to the database: ', err);
        throw err;
      });

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error('Server error: ', err);
  }
})();
