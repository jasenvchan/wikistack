const express = require('express');
const views = require('./views/index');


const router = express.Router();

//mainpage route
router.get('/', async (req, res) => {
	res.send(views.main(''));
});

module.exports = router;