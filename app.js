const express = require('express');
const pg = require('pg');
const routes = require('./router');
const dbObjects = require('./models');
const Sequelize = require('sequelize');
const db = dbObjects.db;
const User = dbObjects.User;
const Page = dbObjects.Page;

const app = express();

app.use(express.urlencoded({ extended: false }));

//app.use(routes);

app.get('/', (req,res)=>{
	console.log("redirecting");
	res.redirect('/wiki');
});

app.use('/wiki', require('./router'));


const init = async () => {
  await db.sync(/*{ force: true }*/);
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

app.get('*', (req, res) => {
	res.status(404).send('<h1>404 error</h1>');
})

init();
