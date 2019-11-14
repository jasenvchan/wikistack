const express = require('express');
const pg = require('pg');
const routes = require('./router');


const app = express();

app.use(routes);


app.listen(3000, ()=>{
	console.log('listening on port 3000')
});
