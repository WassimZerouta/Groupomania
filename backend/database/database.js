const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const BDD_PASSWORD = process.env.BDD_PASSWORD;
const BDD_USER = process.env.BDD_USER;

const sequelize = new Sequelize("groupomania", BDD_USER, BDD_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

const db = {};

db.sequelize = sequelize;
db.User = require("../models/User")(sequelize);
db.Post = require("../models/Post")(sequelize);
db.Comment = require("../models/Comment")(sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.User.hasMany(db.Comment);
db.Post.hasMany(db.Comment);

db.Comment.belongsTo(db.User);
db.Comment.belongsTo(db.Post);

sequelize.authenticate().then(
  function (err) {
    console.log("Connection has been established successfully.");
  },
  function (err) {
    console.log("Unable to connect to the database:", err);
  }
);

sequelize
  .sync({
    logging: console.log,
  })
  .then(
    function (err) {
      console.log("Vous etes connecté à la base de données");
    },
    function (err) {
      console.log("Impossible de se connecter à la base de donées", err);
    }
  );

module.exports = db;
