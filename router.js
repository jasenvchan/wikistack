const express = require('express');
const views = require('./views/index');
const models = require('./models/index.js');


const router = express.Router();

//mainpage route
router.get('/', async (req, res) => {
	res.send(views.main(''));
});

router.post('/', async (req, res, next) => {	

	const page = new models.Page({
		title: req.body.title,
		slug: req.body.title,
		content: req.body.content,
		status: req.body.status
	});

	try{
		await page.save();
		res.redirect('/');
	} catch(error){
		console.log('error saving form input');
		next(error);
	}

});

router.get('/add', async (req, res) => {
	res.send(views.addPage());
});



module.exports = router;