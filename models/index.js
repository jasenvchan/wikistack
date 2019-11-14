const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

let editedSlug = (title) => {
  let editedSlug = title.replace(' ', '_');
  editedSlug = editedSlug.replace(/[^\w]*/g,'');
  return editedSlug;
}

db.authenticate().then(() => {
  console.log('connected to the database');
});

const Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
});

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

Page.beforeCreate((pageInstance, options) => {
  pageInstance.slug = editedSlug(pageInstance.title);
});

Page.belongsTo(User, { as: 'author' });

module.exports = { db, Page, User };
