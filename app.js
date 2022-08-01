require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./db/models/index');
const { authRoute, joinRoute, usersRoute, viewRoute } = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    optionSuccessStatus: 200,
  }),
);
app.use(bodyParser.json());

// routes
app.use('/api/auth/', authRoute);
app.use('/api/join/', joinRoute);
app.use('/api/users/', usersRoute);
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
