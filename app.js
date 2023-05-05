const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./src/controllers/user-controller');

const app = express();

app.use(bodyParser.json());

app.use('/users', userController);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
