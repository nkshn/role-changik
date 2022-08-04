require('dotenv').config();

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const { sequelize } = require('./db/models/index');
const { authRoute, bossRoute, viewRoute } = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    optionSuccessStatus: 200,
  }),
);

// routes
app.use('/api/auth/', authRoute);
app.use('/api/boss/', bossRoute);
app.use('/api/view/', viewRoute);

// start server
(async function () {
  try {
    // connectiing to postgres db
    await sequelize
      .authenticate()
      .then(() => {
        console.log(
          `Connection to DataBase \"${process.env.POSTGRES_DB}\" has been established successfully!`,
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
