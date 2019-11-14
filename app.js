const express = require('express');
const pg = require('pg');
const routes = require('./router');
const dbObjects = require('./models');
const Sequelize = require('sequelize');
const db = dbObjects.db;
const User = dbObjects.User;
const Page = dbObjects.Page;

const app = express();

app.use(routes);

const init = async () => {
  await db.sync(/*{ force: true }*/);
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};
init();
