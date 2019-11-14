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
  const page = new models.Page({
    title: req.body.title,
    slug: req.body.title,
    content: req.body.content,
    status: req.body.status,
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
    const page = await models.Page.findOne({
      where: { slug: req.params.slug },
    });
    //console.log(page);
    res.send(views.wikiPage(page.dataValues));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
