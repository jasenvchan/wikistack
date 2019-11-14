const express = require('express');
const views = require('./views/index');
const models = require('./models/index.js');

const router = express.Router();

//mainpage route
router.get('/', async (req, res) => {
  const pages = await models.Page.findAll();
  //console.log(pages);
  res.send(views.main(pages));
});

router.post('/add', async (req, res, next) => {



//check if author exists
  const authorQueryResult = await models.User.findOne({
  	where: {
  		name: req.body.author,
  		email: req.body['author-email']}
  });

//if author doesn't exist, create new author
  if(authorQueryResult === null){
  	const author = new models.User({
  		name: req.body.author,
  		email: req.body['author-email']
  	});

  	await author.save();
  }

  //get author id
  let authorQueryResult2 = await models.User.findOne({
  	where: {
  		name: req.body.author,
  		email: req.body['author-email']
  	},
  	attributes: ['id']
  });

console.log(authorQueryResult2);
  let authorId = authorQueryResult2.dataValues.id;



  const page = new models.Page({
    title: req.body.title,
    slug: req.body.title,
    content: req.body.content,
    status: req.body.status,
    authorId: authorId
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    console.log('error saving form input');
    next(error);
  }
});

router.get('/add', async (req, res) => {
  res.send(views.addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
  	//find page data
    const page = await models.Page.findOne({
      where: { slug: req.params.slug },
    });

    //find author data
    let author = await models.User.findOne({
  	where: {
  		id: page.dataValues.authorId
  	},
  	attributes: ['name']
  });

    //console.log(page);
    res.send(views.wikiPage(page.dataValues, author.dataValues));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
